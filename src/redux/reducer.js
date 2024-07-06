import { createSlice } from "@reduxjs/toolkit"
const initialState={
  _id:'',
  username:'',
  email:'',
  profile_pic:'', 
  token:'',
  onlineuser:'',
  socketconnection:''
}
 export const Reducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser:(state,action)=>{
      state._id=action.payload._id
      state.username=action.payload.username
      state.email=action.payload.email
      state.profile_pic=action.payload.profile_pic
    },
    setToken:(state,action)=>{
      state.token=action.payload.token
    },
    setLogout:(state,action)=>{
      state._id=''
      state.username=''
      state.profile_pic=''
      state.email=''
      state.token=''
      state.onlineuser=''
      state.socketconnection=''
    },
    setOnlineuser:(state,action)=>{
      state.onlineuser=action.payload
    },
    setSocketconnection:(state,action)=>{
      state.socketconnection=action.payload
    }
  },
})
export const {setUser,setToken,setLogout,setOnlineuser,setSocketconnection}=Reducer.actions
export default Reducer.reducer
// export default Reducer