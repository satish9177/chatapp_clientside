import { useSelector } from "react-redux";

const Profilepic = ({Id, username, profilepic,w }) => {
  const {onlineuser}=useSelector((state)=>state.user);
  // console.log(username);
  const bgcol=[
    'bg-slate-300',
    'bg-blue-300',
    'bg-orange-300',
    'bg-green-300',
    'bg-red-300',
     'bg-sky-300 '
  ]
  const check=onlineuser.includes(Id)
  // console.log('checked',check);
  const random=Math.floor(Math.random()*bgcol.length);
  return (
    <div className=" relative">
      {/* {username} */}
      {profilepic ? (
        <div> <img src={profilepic} alt={username}  className={`rounded-full h-[55px] w-[55px] p-1 bg-cover`}/></div>
      ) : (
        <div className={` flex justify-center text-3xl items-center font-medium rounded-full border-2 w-[55px] h-[55px] py-1 text-center ${bgcol[random]}`}>
          {username?.charAt(0).toUpperCase()}
        </div>
      )}
      {
        check &&(<div className="w-2 h-2 bg-green-500 absolute bottom-2 right-1 rounded-full"> </div>)
      }
    </div>
  );
};

export default Profilepic;
