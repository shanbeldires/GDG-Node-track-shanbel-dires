import express from "express";

const app = express();
const portNum = 4000;

app.use(express.json());

app.get("/home", (req, res) => {
    res
        .contentType("text/html")
        .status(200)
        .send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                <style>
                    h1 {
                        color: green;
                    }
                </style>
            </head>
            <body>
                <h1>Welcome to home page</h1>
            </body>
            </html>
        `);
});

app.get("/about", (req, res) => {
    res.send("This is the about page of our Express application.");
});

app.get(
    "/student/:studentName/:studentId/:studentDepartment",
    (req, res) => {
        const name = req.params.studentName;
        const id = req.params.studentId;
        const department = req.params.studentDepartment;

        res.json({
            studentName: name,
            studentId: id,
            studentDepartment: department,
            status: "success"
        });
    }
);

app.listen(portNum, () => {
    console.log(`Server is running on port number ${portNum}`);
});
