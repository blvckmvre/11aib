import { ReactNodeArray } from "react";
import reactStringReplace from "react-string-replace";


/* 
>>[text] – Mention (Reply link)
>[text] – Blockquote (Greentext)
*[text]* – Emphasize
**[text]** – Bold
__[text]__ – Underline
{{[text]}} – Spoiler
*/

const replyLink = (content: string | ReactNodeArray) =>
    reactStringReplace(content, /^>>(\d+)/mg, (match, i)=>
        <a key={i} href={'#'+match}>{'>>'+match}</a>
    );

const greenText = (content: string | ReactNodeArray) =>
    reactStringReplace(content, /^>(.+)$/mg, (match, i)=>
        <span key={'gt'+i} className="greentext">{'>'+match}</span> 
    );

const emphasize = (content: string | ReactNodeArray) =>
    reactStringReplace(content, /\*([\s\S]+)\*/mg, (match, i)=>
        <em key={'em'+i}>{match}</em>
    );

const bold = (content: string | ReactNodeArray) =>
    reactStringReplace(content, /\*\*([\s\S]+)\*\*/mg, (match, i)=>
        <strong key={'b'+i}>{match}</strong>
    );
const underline = (content: string | ReactNodeArray) =>
    reactStringReplace(content, /__([\s\S]+)__/mg, (match, i)=>
        <u key={'ul'+i}>{match}</u>
    );
const spoiler = (content: string | ReactNodeArray) =>
    reactStringReplace(content, /\{\{([\s\S]+)\}\}/mg, (match, i)=>
        <span key={'sp'+i} className="spoiler">{match}</span>
    );

export const markdown = (content: string) => {
    var result;
    result = replyLink(content);
    result = greenText(result);
    result = bold(result);
    result = emphasize(result);
    result = underline(result);
    result = spoiler(result);
    return result;
}
