import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import URL from "../api";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setLogout ,setUser,setOnlineuser,setSocketconnection} from "../redux/reducer";
import { MdOutlineMessage } from "react-icons/md";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import Profilepic from "../uploadimage/profilepic";
import Update from "../Components/Update";
import AddFriend from "../Components/AddFriend";
import { IoMdClose } from "react-icons/io";
import { GoArrowUpLeft } from "react-icons/go";
import logo from "../assest/logo.jpeg";
import Io from 'socket.io-client'
const Home = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.user);
  // const user = location?.state;
  const path=location.pathname==='/'
  console.log("userda:", user);
  // const [user, setuser] = useState("");
  const nav = useNavigate();
  const [update, setupdate] = useState(false);
  const [addFriend, setaddFriend] = useState(false);
  console.log("user-inhome:", user);
  // if(user?.email===''){
  //   nav('/email');
  // }
  const fetched = async () => {
    // console.log('fgf');
    // setuser(pt);
    await fetch(`${URL}/userdetail`, {
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data?.userdata?.logout) {
          dispatch(setLogout());
          nav("/email");
        }
        console.log("userhome:",data.userdata);
        dispatch(setUser(data.userdata));
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    // console.log("users:", user.userdata);
    fetched();
  }, []);
  const Logout = async () => {
    await fetch(`${URL}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: user.email,
      }),
    })
      .then((res) => {
        if (res.ok) {
          console.log("logout successfully");
          toast.success("logout successfully");
          // alert("registered successfully");
          nav("/email");
        } else {
          console.log("Failed");
          toast.error("logout failed");
        }
        return res.json();
      })
      .then((data) => console.log(data))
      .catch((err) => {
        console.log("api not fetch", err);
        alert("api not fetch");
      });
  };
  useEffect(()=>{
     const socketconnection=Io(`http://localhost:8080`,{
      auth:{
        token:localStorage.getItem('token')
      }
     })
     socketconnection.on('online_user',(data)=>{
      console.log("onlineusers:",data)
      dispatch(setOnlineuser(data));
     })
     dispatch(setSocketconnection(socketconnection));
     return ()=>{
      socketconnection.disconnect()
     }
  },[])
  return (
    <div className={`flex h-screen w-screen flex-row `}>
      <aside className="flex  w-96 h-full  ">
        <div className="flex flex-col w-14 h-screen bg-gray-200 justify-between ">
          <div>
            <div className={`  p-2 text-3xl active:bg-gray-300 cursor-pointer`} title="message">
              {" "}
              <MdOutlineMessage />
            </div>
            <div
              className={`  p-2 text-3xl active:bg-gray-300 cursor-pointer`}
              onClick={(e) => {
                setaddFriend(true);
              }}
              title="add Friend"
            >
              {" "}
              <MdOutlinePersonAddAlt />
            </div>
          </div>
          <div>
            <div className=" cursor-pointer z-0" onClick={(e) => setupdate(true)} title="profile pic">
              <Profilepic
                username={user?.username}
                profilepic={user?.profile_pic}
                w={12}
              />
            </div>
            <div
              className={`  p-2 text-3xl active:bg-gray-300 cursor-pointer`}
              onClick={Logout}
              title="logout"
            >
              {" "}
              <TbLogout2 />
            </div>
            {/* <div className={`p-2 text-3xl active:bg-gray-300 cursor-pointer`}>  <MdOutlinePersonAddAlt /></div> */}
          </div>
        </div>
        <div className="flex flex-col  w-full ">
          <div className="flex justify-center border-b-2 py-3 text-2xl font-semibold  bg-cyan-400">
            Message
          </div>
          <div className="scrollbar overflow-x-hidden overflow-y-scroll h-screen text-gray-400">
            <div className="flex justify-center flex-col items-center ">
              <div className="text-8xl font-medium ">
                {" "}
                <GoArrowUpLeft />
              </div>

              <p className="text-lg font-medium ml-8">
                Explore users for More Conversations with,
              </p>
            </div>
          </div>
        </div>
      </aside>
      {update && (
        <div className="h-screen w-screen bg-black fixed bg-opacity-60">
          <Update
            Change={setupdate}
            username={user?.username}
            profilepic={user?.profile_pic}
            email={user?.email}
            password={user?.password}
          />
        </div>
      )}
      {addFriend && (
        <div className="h-screen w-screen bg-black fixed bg-opacity-60 ">
          <div
            className="flex absolute top-1 right-2 text-3xl text-white cursor-pointer"
            onClick={(e) => {
              setaddFriend(false);
            }}
          >
            <IoMdClose />
          </div>
          <AddFriend Change={setaddFriend} />
        </div>
      )}
      <div className={`flex justify-center w-screen h-screen items-center ${!path && 'hidden'}`}>
        <div className="w-[400px] h-[350px]">
          <img src={logo} alt="logo" />
          <h1 className="text-xl text-gray-400 text-center font-medium">
            Select user to send Message
          </h1>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Home;
