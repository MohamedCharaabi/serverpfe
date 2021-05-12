import express from 'express';
import mongoose from 'mongoose'
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';



import requestRoutes from './routes/requests.js'
import personnelRoutes from './routes/personnels.js'
import themeRoutes from './routes/themes.js'
import userRoutes from './routes/auth.js'
import depRoutes from './routes/departments.js'
import dirRoutes from './routes/direction.js'
import divRoutes from './routes/division.js'
import serRoutes from './routes/service.js'





dotenv.config();


const app = express();
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: ['https://pfecims.web.app', 'http://localhost:3000', 'http://localhost:3001', 'http://localhost:8000', 'http://localhost:4200']  //3 react , 8 view, 42 angular
}));

app.use("/request", requestRoutes);
app.use("/personnel", personnelRoutes);
app.use("/theme", themeRoutes);
app.use("/user", userRoutes);
app.use("/dep", depRoutes);
app.use("/dir", dirRoutes);
app.use("/div", divRoutes);
app.use("/ser", serRoutes);






const PORT = process.env.PORT || 5006;




mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () => {
    console.log('Database connected');
    app.listen(PORT, () => {
        console.log(`Starting server at http://localhost:${PORT}`);
    })
})

