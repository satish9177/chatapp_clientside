import { configureStore } from '@reduxjs/toolkit'
import Reducer from './reducer'

const store = configureStore({
  reducer: {
    user:Reducer
  }
})

export default store