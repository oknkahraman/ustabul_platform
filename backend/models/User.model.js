const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email gereklidir'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Geçerli bir email adresi giriniz']
  },
  password: {
    type: String,
    required: [true, 'Şifre gereklidir'],
    minlength: [6, 'Şifre en az 6 karakter olmalıdır']
  },
  fullName: {
    type: String,
    required: [true, 'Ad Soyad gereklidir'],
    trim: true
  },
  role: {
    type: String,
    enum: ['worker', 'employer'],
    required: [true, 'Rol gereklidir']
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// 🚨 CRITICAL FIX: Mongoose v8+ - Remove next() callback, use async/await only
userSchema?.pre('save', async function() {
  if (!this.isModified('password')) return;
  
  const salt = await bcrypt?.genSalt(10);
  this.password = await bcrypt?.hash(this.password, salt);
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt?.compare(candidatePassword, this.password);
};

// Remove password from JSON response
userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj?.password;
  return obj;
};

module.exports = mongoose?.model('User', userSchema);