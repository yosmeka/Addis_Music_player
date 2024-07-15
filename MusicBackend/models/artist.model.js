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

ArtistSchema.methods.toJSON = function() {
    const artist = this.toObject();
    delete artist.photo.path;
    return artist;
};

const Artist =  mongoose.model('Artist', ArtistSchema);


export default Artist;
