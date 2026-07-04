import axios from "axios";



const authApiInstance = axios.create({
    baseURL:"http://localhost:5000/api/auth", 
    withCrenditails:true,   
}) 


export async function register({fullname,email,contact,password,isSeller}){
    const  response =await authApiInstance.post("/register",{
        fullname,email,password,contact,isSeller
    })
    
}