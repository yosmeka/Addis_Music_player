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
    }
  },
  audio: {
    url: {
        type: String,
        required: true,
    }
  },
}, {
    timestamps: true,
});

MusicSchema.pre('save', function(next) {
  console.log('1', this.categories);
  this.categories = [...new Set(this.categories)];
  console.log('2', this.categories);
  next();
});

const Music = mongoose.model('Music', MusicSchema);

export default Music;