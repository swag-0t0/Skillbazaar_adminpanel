import mongoose from 'mongoose';
const { Schema } = mongoose;

const profileSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  coverPhoto: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['new', 'normal', 'experienced'],
    default: 'new'
  },
  socialLinks: {
    facebook: String,
    instagram: String,
    linkedin: String
  },
  rating: {
    average: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

export default mongoose.model("Profile", profileSchema); 