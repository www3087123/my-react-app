import React from 'react'
import { Navigate } from 'react-router-dom'
export default function AuthComponents({children}) {
    let token = localStorage.getItem("storeageToken")
    if(token){
        return children
    }else{
        return <Navigate to={"/login"}/>
    }
}
