import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Profilepic from "../uploadimage/profilepic";
import { HiDotsVertical } from "react-icons/hi";
import { IoMdAdd } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import uploadFile from "../uploadimage/upload";
import { IoMdClose } from "react-icons/io";
import Spinner from "../Pages/Spinner"; 
import moment from 'moment'
const Message = () => {
  const [conversation,setconversation]=useState([]);
  const [upload, setupload] = useState({
    text: "",
    photo: "",
    video: "",
  });
  const [file, setfile] = useState(false);
  const [loading, setloading] = useState(false);
  const socket = useSelector((state) => state?.user?.socketconnection);
  const user=useSelector((state)=>state?.user)
  const params = useParams();
  const [userdata, setuserdata] = useState({
    username: "",
    email: "",
    profilepic: "",
    online: false,
  });
  const userId = params.userId;
  useEffect(() => {
    if (socket) {
      // console.log(socket);
      socket.emit("userId", userId);
      socket.on("user_data", (user) => {
        // console.log(user);
        setuserdata({
          username: user.username,
          email: user.email,
          profilepic: user.profile_pic,
          online: user.online,
        });
      });
    }
  }, [socket,userId]);
  const Handlephoto = async (e) => {
    const file = e.target.files[0];
    setloading(true)
    const photo = await uploadFile(file);
    setloading(false)
    setupload({
      ...upload,
      photo: photo.url,
    });
  };
  const HandleVideo = async (e) => {
    setloading(true);
    // console.log('video')
    const file = e.target.files[0];
    // console.log(file);
    const video = await uploadFile(file);
    setloading(false)
    setupload({
      ...upload,
      video: video.url,
    });
  };
  // console.log(upload);
  const Handlesend=(e)=>{
    if(upload.photo!=='' || upload.text!=='' || upload.video!==''){
      if(socket){
        const data={
          sender:user?._id,
          receiver:userId,
          text:upload.text,
          ImageUrl:upload.photo,
          VideoUrl:upload.video,
          mesgByUserId:user._id
        }
        socket.emit('send_message',data)
        setupload({
          text:"",
          video:"",
          photo:""
        })
        socket.on('conversations',(data)=>{
          console.log(data)
          setconversation(data);
        })
      }
    }
  }
  return (
    <div className="flex flex-col w-screen h-screen backgroundimage m-0">
      <div className="flex flex-row w-full py-1 bg-gray-200 justify-between px-2">
        <div className="flex flex-row gap-2">
          {" "}
          <div>
            <Profilepic
              Id={userId}
              username={userdata?.username}
              profilepic={userdata?.profilepic}
              w={55}
            />
          </div>
          <div>
            <h1 className="font-medium">{userdata.username}</h1>
            {userdata.online ? (
              <h1 className="font-normal text-sky-400">online</h1>
            ) : (
              <h1 className="font-normal text-red-300">offline</h1>
            )}
          </div>
        </div>
        <div className=" flex justify-center items-center pr-4 cursor-pointer hover:text-orange-300">
          <HiDotsVertical />
        </div>
      </div>
      {/* messages */}
      <div className=" h-[582px] gap-1 flex flex-col p-2 scrollbar  overflow-y-scroll">
         {
          conversation.length>0?conversation.map((conv)=>{
            return(
              <div className={`bg-gray-200 p-2 w-fit min-w-10 ${conv.mesgByUserId===user?._id && 'ml-auto bg-emerald-300'}`}>
                <div>{conv.text}</div>
                <div className="ml-auto w-fit text-xs">{moment(conv.createdAt).format('hh:mm a')}</div>
              </div>
            )
          }):<></>
         }
      </div>
      <div className="flex flex-row bg-white m-0">
        <div
          className="  text-4xl hover:border-2 rounded-full p-1 cursor-pointer "
          onClick={() => {
            setfile(!file);
          }}
        >
          <IoMdAdd />
        </div>
        <input
          type="text"
          value={upload.text}
          placeholder="Type a message"
          className=" w-11/12 text-xl py-1 outline-none mx-2"
          onChange={(e)=>{setupload({...upload,text:e.target.value})}}
        />
        <button className="text-3xl mt-1 mr-2 p-2 hover:bg-green-700 hover:text-white rounded-full" onClick={Handlesend}>
          <IoSend />
        </button>
        <div
          className={`flex flex-col border-2 rounded-lg fixed bottom-[55px]  bg-gray-200 left-[310px] w-28 ${
            !file && "hidden"
          } `}
        >
          <label
            htmlFor="video"
            className="w-full hover:bg-gray-300 cursor-pointer"
            onClick={() => {
              setfile(false);
            }}
          >
            <span className="text-lg font-normal px-3 ">Video</span>
          </label>
          <label
            htmlFor="image"
            className="w-full hover:bg-gray-300 cursor-pointer"
            onClick={() => {
              setfile(false);
            }}>
            <span className="text-lg font-normal px-3 ">Image</span>
          </label>
          <input
            id="image"
            type="file"
            className="hidden"
            onChange={Handlephoto}
          />
          <input
            id="video"
            type="file"
            className="hidden"
            onChange={HandleVideo}
          />
        </div>
      </div>
      {upload.photo !== "" && (
        <div className=" absolute bottom-32 right-[600px] bg-white ">
          <div
            className="text-3xl absolute right-1 hover:bg-white rounded-full p-1 cursor-pointer"
            onClick={() => {
              setupload({
                ...upload,
                photo: "",
              });
            }}
          >
            <IoMdClose />
          </div>
          <img src={upload.photo} alt="img" className=" aspect-video w-full h-full max-w-sm m-2"  />{" "}
        </div>
      )}
      {upload.video !== "" && (
        <div className=" absolute bottom-32 right-[600px] bg-white ">
          <div
            className="text-3xl absolute right-1 hover:bg-white rounded-full p-1 cursor-pointer z-10"
            onClick={() => {
              setupload({
                ...upload,
                video: "",
              });
            }}
          >
            <IoMdClose />
          </div>
          <video src={upload.video} alt="img"   controls className=" aspect-video w-full h-full max-w-sm m-2" />{" "}
        </div>
      )}
      {
        loading&&(
          <div className=" absolute bottom-32 right-[600px] ">
            <Spinner/>
            </div>
        )
      }
    </div>
  );
};

export default Message;
