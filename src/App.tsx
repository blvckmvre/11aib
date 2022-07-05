import {FC} from 'react'
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom'
import Modal from './comps/ui/modal/Modal'
import { useTypeDispatch, useTypeSelector } from './hooks/redux'
import Thread from './routes/Thread'
import Threads from './routes/Threads'
import { modalSlice } from './store/reducers/modalSlice'

const App:FC = () => {
  const d = useTypeDispatch();
  const {currentImg} = useTypeSelector(state=>state.modalSlice);
  const {setCurrentImg} = modalSlice.actions;
  return (
    <BrowserRouter>
      <Modal clearCurrent={()=>d(setCurrentImg(null))} currentImg={currentImg} />
      <div id='navbar'>
        <Link to='/' id='rootlink'>11AIB</Link>
        <img id='rootimage' src={require('./assets/faviconio.png')} alt='' />
      </div>
      <Routes>
        <Route path='/' element={<Threads />} />
        <Route path='/:id' element={<Thread />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App