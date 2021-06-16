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
import NewUserRoutes from './routes/newAuth.js'
import allLevelsRoutes from './routes/allLevels.js'
import statisticsRoutes from './routes/statistics.js'
import alertsRoutes from './routes/alert.js'
import themeRequest from './routes/themeRequest.js'

dotenv.config();


const app = express();
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: ['https://pfecims.web.app', 'http://localhost:3000', 'https://pfelanding.web.app', 'http://localhost:8000', 'http://localhost:4200', 'http://localhost:3001']  //3 react , 8 view, 42 angular
}));

app.use("/request", requestRoutes);
app.use("/personnel", personnelRoutes);
app.use("/theme", themeRoutes);
app.use("/user", userRoutes);
app.use("/dep", depRoutes);
app.use("/dir", dirRoutes);
app.use("/div", divRoutes);
app.use("/ser", serRoutes);
app.use("/new", NewUserRoutes);
app.use("/all", allLevelsRoutes);
app.use("/stat", statisticsRoutes);
app.use("/alert", alertsRoutes);
app.use("/requesttheme", themeRequest);

const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () => {
    console.log('Database connected');
    app.listen(PORT, () => {
        console.log(`Starting server at http://localhost:${PORT}`);
    })
})

