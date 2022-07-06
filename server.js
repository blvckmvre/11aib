const express = require('express'),
      app = express(),
      bp = require('body-parser'),
      cors = require('cors'),
      path = require('path'),
      multer = require('multer'),
      cloudinary = require('cloudinary').v2,
      {CloudinaryStorage} = require('multer-storage-cloudinary'),
      {Pool} = require('pg');
require('dotenv').config();

app.use(cors());
app.use(bp.urlencoded({extended: true}));
app.use(bp.json());

app.use(express.static(path.join(__dirname, 'build')));

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
  
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "IMGS"
    }
});

const upload = multer({storage});

const pool = new Pool({
    connectionString : process.env.POSTGRES,
    ssl: {
        rejectUnauthorized: false
    }
})

app.get('/threads', (q,a)=>{
    var inp = q.query.input ? 
        '%'+q.query.input.toLowerCase().split(' ').join('%')+'%' : 
        '%';
    var{limit, page} = q.query;
    var offset = limit*(page-1);
    pool.query(`SELECT 
    id, title, contents, thds.created_on, bumped_on, attach, 
    json_agg(repls) AS replies, COUNT(*) OVER() AS total_count
    FROM thds 
    LEFT OUTER JOIN repls 
    ON thds.id = repls.thread_id 
    WHERE LOWER(title) LIKE '${inp}' 
    GROUP BY thds.id 
    ORDER BY bumped_on DESC OFFSET ${offset} LIMIT ${limit};`,(e,res)=>{
        if(e) console.log(e); else a.json(res.rows);
    })
});

app.get('/getthread', (q,a) => {
    var {id} = q.query;
    if(+id)
    pool.query(`SELECT 
    id, title, contents, thds.created_on, bumped_on, attach, json_agg(repls) AS replies 
    FROM thds 
    LEFT OUTER JOIN repls 
    ON thds.id = repls.thread_id 
    WHERE thds.id=${+id}
    GROUP BY thds.id 
    ORDER BY bumped_on DESC;`, (e,res)=>{
        if(e) console.log(e); else a.json(res.rows[0]);
    });
    else a.end();
})

app.post('/threads', upload.array('pic'), (q,a)=>{
    var {title,contents} = q.body;
    var files = q.files.map(file=>({
        thumbnail: file.path.replace('upload/',
            'upload/c_fit,h_250,w_250,q_20/'), 
        path: file.path,
        filename: file.filename
    }));
    var attach = JSON.stringify(files)
                     .replace(/[\[\]]/g,'')
                     .replace(/\{/g,'\'{')
                     .replace(/\}/g,'}\'');
    attach ?
    pool.query(`INSERT INTO thds(title,contents,created_on,bumped_on,attach) 
    VALUES('${title}','${contents}','${new Date().toISOString()}','${new Date().toISOString()}',array[${attach}]::json[])`,
        e=>{if(e) console.log(e); else a.end()}) :
    pool.query(`INSERT INTO thds(title,contents,created_on,bumped_on) 
    VALUES('${title}','${contents}','${new Date().toISOString()}','${new Date().toISOString()}')`,
        e=>{if(e) console.log(e); else a.end()})
});

app.put('/reply', upload.array('postpic'), (q,a)=>{
    var {thread_id, post_contents} = q.body;
    var files = q.files.map(file=>({
        thumbnail: file.path.replace('upload/',
            'upload/c_fit,h_200,w_200,q_20/'), 
        path: file.path,
        filename: file.filename
    }));
    var post_pics = JSON.stringify(files)
                        .replace(/[\[\]]/g,'')
                        .replace(/\{/g,'\'{')
                        .replace(/\}/g,'}\'');
    post_pics ?
    pool.query(`INSERT INTO repls(thread_id,post_contents,created_on,post_pics)
    VALUES(${+thread_id},'${post_contents}','${new Date().toISOString()}',array[${post_pics}]::json[]);
    UPDATE thds SET bumped_on = '${new Date().toISOString()}' WHERE id=${thread_id}`,
        e=>{if(e) console.log(e); else a.end()}) :
    pool.query(`INSERT INTO repls(thread_id,post_contents,created_on)
    VALUES(${thread_id},'${post_contents}','${new Date().toISOString()}');
    UPDATE thds SET bumped_on = '${new Date().toISOString()}' WHERE id=${thread_id}`,
        e=>{if(e) console.log(e); else a.end()})
});

app.get('/*', (q, a) => {
    a.sendFile(path.join(__dirname, 'build', 'index.html'));
});


const listener = app.listen(process.env.PORT || 3001, ()=>{
    console.log('server running, '+listener.address().port);
});