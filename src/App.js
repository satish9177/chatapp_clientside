import { Outlet } from 'react-router-dom';
import './App.css';
import toast, { Toaster } from 'react-hot-toast';
function App() {
  return (
   <div> 
    <Toaster/>
    <div >
       <Outlet/>
    </div>
    </div>
  );
}

export default App;
