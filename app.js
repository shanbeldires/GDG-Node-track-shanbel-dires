import express from "express";
const app=express();
const portNum=4000;
app.use(express.json());
app.get("/home",(req,res)=>{
    res.contentType("text/html").status(200).send(`<h1 style="color:green">welcome to home page</h1>`)
})
app.get("/about",(req,res)=>{
    res.send("This is the about page of our Express application.")
})
app.get("/student/:studentName/:studentId/:studentDepartment",(req,res)=>{
    const name=req.params.studentName;
    const id=req.params.studentId;
    const department=req.params.studentDepartment;
    res.json( {
        studentName:name,
        studentId:id,
        studentDepartment:department,
        status:"success"
    })
})
app.listen(portNum,()=>{
   
    console.log(`server is running on port number ${portNum}`)
})
