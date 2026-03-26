import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String, unique: true, sparse: true },
  role: { 
    type: String, 
    enum: ['user', 'manager', 'admin'], 
    default: 'user' 
  },
  refreshToken: { type: String }
}, { 
  timestamps: true,
  // Dodajemo ovo za prebacivanje _id u id i uklanjanje __v:
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
      delete ret._id; // Briše _id jer sada imaš id
    }
  },
  toObject: {
    virtuals: true
  }
});

export default mongoose.model('User', userSchema);
