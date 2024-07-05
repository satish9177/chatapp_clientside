import { useNavigate, useLocation } from "react-router-dom";
// import { FaRegUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import URL from "../api";
import Profilepic from "../uploadimage/profilepic";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../redux/reducer";
const Password = () => {
  const nav = useNavigate();
  const location = useLocation();
  const [data, setdata] = useState();
  const dispatch=useDispatch();
  // const [userdetail,setusedetail]=useState();
  // console.log('location',location.state.check)
  const userdetail = location?.state?.check;

  // console.log("userdetails:"+userdetail?.userdata)
  useEffect(()=>{
    // console.log("loc:",userdetail);
    console.log("userdetails:",userdetail)
      dispatch(setUser(userdetail));
    if(!userdetail){
      nav('/email');

     }
    // eslint-disable-next-line
  },[])
  
  const Handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const resp=await fetch(`${URL}/password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          userId: userdetail?._id,
          password: data,
        }),
        
      },)
      const d=await resp.json();
      // console.log(resp);

      if (resp.ok) {
        toast.success("email verified");
         console.log("password:",d);
          dispatch(setToken(d));
         
         localStorage.setItem('token',d?.token);
        setdata("");
        nav("/",{
          state:userdetail
        });
      } else {
        toast.error("wrong password");
      }
      
    } catch (error) {
      console.log(error)
      toast.error('api is not fetched')
    }
  
     
  };
  
  return (
    <div className="flex flex-col justify-center items-center w-screen">
      <form
        className="flex flex-col border-2 p-6  mx-96 my-5 w-96 gap-2"
        onSubmit={Handlesubmit}
      >
        <div className="flex  flex-col items-center justify-center">
          {/* <FaRegUserCircle /> */}
          <Profilepic username={userdetail?.username} profilepic={userdetail?.profile_pic} w={14}/>
           <h1 className="text-xl font-medium">{userdetail?.username}</h1>
        </div>
        <h1 className="text-lg my-2">Welcome to ChatApp</h1>
        <h1>Password:</h1>
        <input
          type="password"
          value={data}
          onChange={(e) => setdata(e.target.value)}
          placeholder="enter your password"
          className="w-full border-2 border-green-200 outline-emerald-400 p-2"
        />
        <button className=" my-2 py-2 border-2 cursor-pointer rounded-sm text-white text-lg bg-blue-600 hover:bg-blue-500">
          Login
        </button>
        {/* <div>
          <span className="mr-2">Don't have an account?</span>
          <Link
            to="/register"
            className=" hover:text-blue-700 font-semibold text-black"
          >
            Sign Up
          </Link>
        </div> */}
      </form>
    </div>
  );
};

export default Password;
