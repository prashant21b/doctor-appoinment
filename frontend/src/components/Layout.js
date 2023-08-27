import React,{useState,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import '../styles/layout.css'
import { userMenu,adminMenu } from '../data'
import { Link, useNavigate,NavLink } from 'react-router-dom'
import { showLoading,hideLoading } from '../redux/Slices/alertSlice'
import { Home } from '../screens/Home'
import axios from 'axios'
import { setUser } from '../redux/Slices/userSlice'
import { toast } from 'react-hot-toast'
import FaUserDoctor from 'react-icons/fa'
export const Layout = ({children}) => {
   const { user } = useSelector((state) => state.user);
   console.log("user",user)
   const dispatch=useDispatch();
  const [active,setActive]=useState([])
  const getUserData = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post("http://localhost:4000/api/v1/getUserData", null, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
      });
      console.log(localStorage.getItem("jwtToken"))
      setActive(res.data);
      console.log("active",active)
      console.log("res.data",res.data);
      dispatch(setUser(res.data))
      dispatch(hideLoading());
      
      
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
getUserData();
  },[Home])
   const SidebarMenu=user?.data.isAdmin?adminMenu:userMenu
   const navigate=useNavigate()
   function logoutHandler() {
    localStorage.removeItem('jwtToken');
    toast.error("Logout Sucessfully")
    window.location.href = '/login';
   
  }
  
   return (
    <>
    <div className='main'>
        <div className='layout'>
            <div className='sidebar'>
            <div className='logo' style={{textAlign:"center",fontSize:"40px",color:"rgb(211,14,14"}}>Doc Book</div>
            
            <div className='menu'>
                {SidebarMenu.map(menu=>{
                    return(
                    <>
                    <div className='menu-item'>
                       <i className={menu.icon} ></i>
                       <NavLink to={menu.path}>{menu.name}</NavLink>
                    </div>
                    </>
                    )
                })}
                <div className='menu-item'>
                <i class="fa fa-sign-out" aria-hidden="true"></i>
                       <Link onClick={logoutHandler}>Logout</Link>
                    </div>
            </div>
            </div>
            <div className='content'>
             <div className='header'>
             <div className="header-content">
               <Link to='/notification'><i class="fa-solid fa-bell"><span style={{color:"red"}}>({user?.data.notifcation.length})</span></i></Link> 
                <NavLink to="/profile">{user?.data.name}</NavLink>
              </div>
             </div>
             <div className='body'>{children}</div>
             <div className='footer'>
                
             </div>
            </div>
        </div>
    </div>
    </>
  )
}
