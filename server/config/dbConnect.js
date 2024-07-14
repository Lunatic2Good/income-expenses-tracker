const mongoose = require("mongoose");

//connect

const dbConnect = async ()=> {
    try {
        await mongoose.connect('mongodb+srv://himeshtyagi315:Zb6mxWfHX9sQdUxU@fullstack-blog.hz79dxf.mongodb.net/income-expenses-app?retryWrites=true&w=majority&appName=fullstack-blog');
        console.log("DB connnected Successfully");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

dbConnect();