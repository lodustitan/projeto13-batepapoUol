import { app } from './routes/Route.js';
import dotenv from "dotenv";


dotenv.config();
app.listen(process.env.EXPRESS_PORT);