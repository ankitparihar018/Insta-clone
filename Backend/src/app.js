const express =require( "express");
const cookieParser =require ("cookie-parser");
const cors = require("cors");
const authRouter =require( "./routes/auth.routes.js");
const postRouter =require ("./routes/post.routes.js");
const userRouter =require ("./routes/user.routes.js");



const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));

app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/api/user", userRouter);


module.exports = app;