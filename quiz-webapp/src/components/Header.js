import React ,{useState,useEffect} from 'react'
import {Link} from "react-router-dom"
import { connectWallet } from '../api/web3'



const Header=({title, showWallet, showHome,showAdmin})=> {
  const [isConnected, setIsConnected] = useState(false)
  const connectToWallet = ()=>{
    var isConnectedToWallet = connectWallet()
    setIsConnected(isConnectedToWallet)
  }

  useEffect(()=>{
    connectToWallet()
  })
  
  return (
    <div className='p-4 text-center' style={{backgroundColor:"#C9BBCF", fontSize:20, fontWeight:600,boxShadow:"0px 3px 6px"}}>
    {showHome && <Link to={"/"} className=' btn btn-dark btn-sm' style={{float:"left"}}>Home</Link>}
    
    {showAdmin && <Link to={"/admin"} className='btn btn-dark btn-sm' style={{float:"left"}}>Admin</Link>}
    {title} 
    {showWallet && <button className='btn btn-dark btn-sm' style={{float:"right"}} onClick={connectToWallet}>{isConnected? "Wallet Connected":"Connect Wallet"}</button>}
    
    </div>
  )
}
export default Header