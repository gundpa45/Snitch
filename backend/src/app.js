import express from 'express';
import morgan from 'morgan';
import cookieParser from "cookie-parser"
const app = express();
import authrouter from "./routes/auth.route.js"
import cors from "cors"

// Body parsing middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}));
app.use(express.urlencoded({ extended: true }));

// Default/Health-check Route



app.get("/",(req,res)=>{
    res.status(200).json({
        msg:" never mind what the error are "
    })
})
app.use("/api/auth",authrouter)



 
export default app;
