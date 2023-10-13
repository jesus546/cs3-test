import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface InDark {
    dark:boolean
}

const initialState: InDark = {
    dark: false
}

export const darkSlice = createSlice({
    name: 'darkState',
    initialState,
    reducers: {
        setDarkState(state, action: PayloadAction<boolean>) {
            state.dark = action.payload
        }
    }
})

export const  { setDarkState } = darkSlice.actions
export const useDarkState =  ( state:any) => state.darkState.dark
export default darkSlice.reducer