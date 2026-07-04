import { createBrowserRouter } from "react-router"
import Register from "../features/auth/pages/Register"


export const router = createBrowserRouter([
    {
        path:"/",
        element:<><h1>hello world how are you doing today?</h1></>
    },
    {
        path:"/register",
        element:<Register />
    }
])