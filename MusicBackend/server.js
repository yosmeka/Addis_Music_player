import express from "express";
import dotenv from "dotenv";
import musicRoute from "./routes/music.routes.js";
import userRoute from './routes/user.routes.js';
import artistRoute from './routes/aritst.routes.js';
import connectToDatabase from './config/db.js';
import multer from "multer";
import { filtering, file_name, destination_name  } from "./utils/file_processing.js";
import cors from 'cors'

dotenv.config();
const __dirname = import.meta.dirname

const app = express();
const port = process.env.PORT || 8000

connectToDatabase();

app.use(cors());
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(express.static('uploads'));
app.use('/images', express.static('images'));
app.use('/musics', express.static('muiscs'));

const storage = multer.diskStorage({
  destination: destination_name(__dirname),
  filename: file_name,
})
const uploader = multer({
  storage,
  fileFilter: filtering
})

app.use("/api/music", uploader.fields([{name: 'music', maxCount: 1}, {name: 'image', maxCount: 1}]), musicRoute);
app.use("/api/user", userRoute);
app.use("/api/artist", uploader.single('image'), artistRoute);

app.use((err, req, res, next) => {
  console.log(err);
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: "error",
    status: errorStatus,
    message: errorMessage
  });
});


app.listen(port, () => {
  console.log(`api started at port ${port}`)
})