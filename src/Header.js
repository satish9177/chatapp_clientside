import logo from  './assest/logo.jpeg'
const Header = ({children}) => {
  return (
    <>
     <div className='flex justify-center py-3 h-24 shadow-md'>
       <img src={logo} alt='logo' width={180} height={60}/></div>
      
      
     {children}
    </>
   
  )
}

export default Header