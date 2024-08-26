import { connect } from "mongoose";
import { config } from 'dotenv';
config();

const url = process.env.DB_URL;


const connectToDatabase = async () => {
  connect(url+'/musicapi').then(console.log("MongoDB successfully connected!")).catch(err => console.log(err))
}
export default connectToDatabase;