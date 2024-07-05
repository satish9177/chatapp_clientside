const cloudname='dxjzei4jr'
const url=`https://api.cloudinary.com/v1_1/${cloudname}/auto/upload`

const uploadFile=async (file)=>{
  const formdata=new FormData();
  formdata.append('file',file)
  formdata.append('upload_preset','chatapp')
  const resp=await fetch(url,{
    method:'POST',
    body:formdata
  })
  const responsedata=await resp.json();
  return responsedata
}
export default uploadFile