import { Route,Outlet } from "react-router-dom"



const PublicRoute =({children})=>{
let user = false

  return user ? <h1>Haiii</h1> : (<Outlet/>)
}


export default PublicRoute