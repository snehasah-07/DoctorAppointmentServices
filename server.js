const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const doctorRoutes = require("./routes/doctorRoutes");

//dotenv config
dotenv.config();

//connect to db
connectDB();

//rest object
const app = express();

//midddlewares
app.use(morgan('dev'));
app.use(express.json());

//routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/doctor', doctorRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running in ${process.env.DEV_MODE} mode on port ${port}`.yellow);
});
