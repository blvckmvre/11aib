import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAttach } from "../../types/threadTypes";

interface IInitState {
    currentImg: IAttach | null;
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        currentImg: null 
    } as IInitState,
    reducers: {
        setCurrentImg(state,action: PayloadAction<IAttach | null>){
            state.currentImg = action.payload
        }
    }
})

export default modalSlice.reducer;