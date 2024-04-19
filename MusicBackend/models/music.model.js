import mongoose from 'mongoose';

const MusicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
  },
  album: {
    type: String,
  },
  categories: {
    type: [String],
    validate: {
      validator: categories => {
        const allCategories = ['hiphop', 'jazz', 'slow', 'rock', 'sad', 'happy'];
        return categories.filter(category => !allCategories.includes(category.toLowerCase())).length === 0;
      }
    }
  },
  coverImg: {
    url: {
        type: String,
    },
    path: {
      type: String,
    }
  },
  audio: {
    url: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    }
  },
}, {
    timestamps: true,
});

MusicSchema.pre('save', function(next) {
  this.categories = [...new Set(this.categories)];
  next();
});

const Music = mongoose.model('Music', MusicSchema);

export default Music;