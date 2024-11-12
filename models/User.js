const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define the User schema
const UserSchema = new mongoose.Schema(
  {  
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, 
      trim: true, 
      match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    
    phone: {
      type: String,
      required: true,
      trim: true,
      match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid mobile number'] // Example regex for international phone numbers
    },
    address: { type: String },
    dob: { type: Date, required: true },

    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to hash the password before saving
UserSchema.pre("save", async function (next) {
  // Check if the password field is modified
  if (!this.isModified("password")) return next();

  // Generate salt and hash the password
  try {
    // Higher salt rounds for more security, but slower hashing
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
