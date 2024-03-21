import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  musics: []
}

const cakeSlice = createSlice({
  name: 'cake',
  initialState,
  reducers: {
    ordered: state => {
      state.musics.pop()
    },
    restocked: (state, action) => {
      state.musics.push(action.payload)
    }
  }
})

export default cakeSlice.reducer
export const { ordered, restocked } = cakeSlice.actions