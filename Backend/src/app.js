const express =require( "express");
const cookieParser =require ("cookie-parser");
const authRouter =require( "./routes/auth.routes.js");
const postRouter =require ("./routes/post.routes.js");


const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);


module.exports = app;