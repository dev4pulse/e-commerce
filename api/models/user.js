// api/models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true, index: true },
  passwordHash: { type: String, required: true, select: false }, // hidden by default
  name: { type: String, required: true },
  phone: { type: String }
}, { timestamps: true });

// Extra safety: strip hash on JSON serialization
UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.passwordHash;
    return ret;
  }
});

export default mongoose.model('User', UserSchema);
