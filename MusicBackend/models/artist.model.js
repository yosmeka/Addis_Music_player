import mongoose from 'mongoose';

const ArtistSchema = new mongoose.Schema({
    name: {
        reqiured: true,
        type: String,
    },
    biography: {
        type: String,
    },
    photo: {
        url: {
            type: String
        },
        path: {
            type: String
        },
    }
});

const Artist =  mongoose.model('artist', ArtistSchema);
export default Artist;