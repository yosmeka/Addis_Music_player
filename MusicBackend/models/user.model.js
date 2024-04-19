import mongoose from 'mongoose';

export const PlayList = new mongoose.Schema({
    title: {
        type: String,
    },
    musics: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Music',
        }
    ]
});



const UserSchema = new mongoose.Schema({
    email: {
        required: true,
        type: String,
        unique: true,
        lowercase: true,
        validate: {
            validator: email => {    
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email)
            },
            message: email => 'Invalid email format'
        }
    },
    password: {
        required: true,
        type: String,
    },
    role: {
        required: true,
        type: String,
        enum: ['client', 'admin']
    },
    playlists: [PlayList]
}, {
    timestamps: true,
});

const User = mongoose.model('User', UserSchema);

export default User;