import app from "./app.js";
const portNum=3000;
app.listen(portNum,()=>{
    console.log(`server is running on https://localhost:${portNum}`)
})
