import axios from "axios";



const authApiInstance = axios.create({
    baseURL:"http://localhost:5000/api/auth", 
    withCredentials:true,   
}) 


export async function register({fullname,email,contact,password,isSeller}){
    const  response =await authApiInstance.post("/register",{
        fullname,email,password,contact,isSeller
    })
    
return response 
}

export async function login({email,password}){
    const response =await authApiInstance.post("/login",{
        email,password
    })

    return response 
}