import mongoose from 'mongoose';

const TokenSchema = new mongoose.Schema({
    refreshtoken: {
        reqiured: true,
        type: String,
        uinque: true
    }
});

const Token =  mongoose.model('token', TokenSchema);
export default Token;