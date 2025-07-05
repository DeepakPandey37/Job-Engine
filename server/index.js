const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const connectDb = require("./utils/db");
const userRoute = require("./routes/userRoutes");
const companyRoute = require("./routes/companyRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoute = require("./routes/appicationRoute");
const jobCheck = require("./routes/jobcheckRoute");
dotenv.config({});

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions={
 origin:'http://localhost:5173' ,
 credentials:true,

}
app.use(cors(corsOptions));
const PORT = process.env.PORT||3000;

//my apis
app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoutes);
app.use("/api/v1/application",applicationRoute);
app.use("/api/v1/jobcheck",jobCheck);  

app.listen(PORT,()=>{
    connectDb();
console.log(`server running on port ${PORT}`);
});


