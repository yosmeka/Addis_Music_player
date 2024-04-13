import mongoose from 'mongoose';

const MusicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  album: {
    type: String,
  },
  categories: {
    type: [String],
  },
  coverImg: {
    url: {
        type: String,
    }
  },
  audio: {
    url: {
        type: String,
        required: true,
    }
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
    timestamps: true,
});

const Music = mongoose.model('Music', MusicSchema);

export default Music;