import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";
import URL from "../api";
const Email = () => {
  const nav = useNavigate();
  const [data, setdata] = useState();
  const Handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const resp=  await fetch(`${URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data,
        }),
      })
      const userdata=await resp.json();
      if (resp.ok) {
           
        toast.success("email verified");
        setdata("");
        nav("/password",{
          state:userdata
        });
      } else {
        toast.error("email not exists");
      }
    } catch (error) {
      toast.error("api not fetched");
      console.log("error", error);
    }      
  };
  return (
    <div className="flex flex-col justify-center items-center w-screen">
      <form
        className="flex flex-col border-2 p-6  mx-96 my-5 w-96 gap-2"
        onSubmit={Handlesubmit}
      >
        <div className="flex justify-center text-6xl">
          <FaRegUserCircle />
        </div>
        <h1 className="text-lg my-2">Welcome to ChatApp</h1>
        <h1>Email:</h1>
        <input
          type="text"
          value={data}
          onChange={(e) => setdata(e.target.value)}
          placeholder="enter your email"
          className="w-full border-2 border-green-200 outline-emerald-400 p-2"
        />
        <button className=" my-2 py-2 border-2 cursor-pointer rounded-sm text-white text-lg bg-blue-600 hover:bg-blue-500">
          GoTo
        </button>
        <div>
          <span className="mr-2">Don't have an account?</span>
          <Link
            to="/register"
            className=" hover:text-blue-700 font-semibold text-black"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Email;
