import { useEffect, useState } from "react";
import Spinner from "../Pages/Spinner";
import URL from "../api";
import Profilepic from "../uploadimage/profilepic";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
const AddFriend = ({ Change }) => {
  const [search, setsearch] = useState("");
  const [users, setusers] = useState([]);
  const [loading, setloading] = useState(true);
  
  const Searchdata = async (e) => {
    setloading(true);
    const resp = await fetch(`${URL}/search_users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search }),
    });
    const data = await resp.json();
    if (resp.ok) {
      setusers(data.data);
      console.log(data);
    } else {
      console.log("data is not fetched");
    }
    setloading(false);
  };
  useEffect(() => {
    console.log(search);
    Searchdata();
  }, [search]);
  return (
    <div className="flex flex-col justify-center items-center  absolute top-20 left-[500px] z-40  ">
      <input
        type="text"
        placeholder="search user by name email.."
        className=" outline-none w-96 p-3 mb-1 rounded-t-md"
        value={search}
        onChange={(e) => {
          setsearch(e.target.value);
        }}
      />
      <div className="text-3xl absolute top-2 right-4">
        <CiSearch />
      </div>
      <div className="w-96  bg-white flex flex-col  max-h-80 overflow-y-scroll gap-2 scrollbar pt-2 rounded-b-md">
        {loading && <Spinner />}

        {users.length > 0 && !loading ? (
          users.map((user) => {
            return (
              <>
                <Link
                  to={"/" + user._id}
                  onClick={() => {
                    Change(false);
                  }}
                >
                  <div className="flex justify-start border-b-2  items-center p-2 cursor-pointer gap-2 ">
                    <div>
                      <Profilepic
                        Id={user?._id}
                        username={user?.username}
                        profilepic={user?.profile_pic}
                        w={55}
                      />
                    </div>
                    <div className="flex flex-col ">
                      <div className="text-base font-bold">
                        {user?.username}
                      </div>
                      <div>{user?.email}</div>
                    </div>
                  </div>
                </Link>
              </>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default AddFriend;
