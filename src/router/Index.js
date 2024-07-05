import { createBrowserRouter } from "react-router-dom";
import App from '../App'
import Register from "../Pages/register";
import Email from "../Pages/email";
import Password from "../Pages/password";
import Home from "../Pages/Home";
import Message from "../Components/Message";
import Header from "../Header";
const router=createBrowserRouter([
  {
    path:'/',
    element:<App/> ,
    children:[
      {
        path:'register',
        element:<Header><Register/></Header>
      },
      {
        path:'email',
        element:<Header><Email/></Header>
      },
      {
        path:'password',
        element:<Header><Password/></Header>
      },
      {
        path:'',
        element:<Home/>,
        children:[
          {
            path:':userId',
            element:<Message/>
          }
        ]
      }
    ]
  }
])
 export default router