import { setError,setLoading,setUser } from "../state/auth.slice";
import { register } from "../service/auth.api";
import { useDispatch } from "react-redux";


export const userAuth=()=>{
   const dispatch =useDispatch()
async function handleRegister({fullname,email,paswword,contact,isSeller=false}){
    const data =await register({fullname,email,paswword,contact,isSeller})
    dispatch(setUser(data.user))
}

    return {handleRegister}
}


