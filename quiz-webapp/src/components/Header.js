import React ,{useState,useEffect} from 'react'
import {Link} from "react-router-dom"
import { connectWallet } from '../api/web3'



const Header=({title, showWallet, showHome})=> {
  const [isConnected, setIsConnected] = useState(false)
  const connectToWallet = ()=>{
    var isConnectedToWallet = connectWallet()
    setIsConnected(isConnectedToWallet)
  }

  useEffect(()=>{
    connectToWallet()
  })
  
  return (
    <div className='p-4 text-center' style={{backgroundColor:"red", fontSize:20}}>
    {title} 
    {showWallet && <button className='btn btn-dark' style={{float:"right"}} onClick={connectToWallet}>{isConnected? "Wallet Connected":"Connect Wallet"}</button>}
    {showHome && <Link to={"/"} className='btn btn-dark' style={{float:"right"}}>Home</Link>}
    
    </div>
  )
}
export default Header