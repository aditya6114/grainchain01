import mongoose from 'mongoose';

const FoodRequestSchema = new mongoose.Schema({
  foodType: {
    type: String,
    required: true,
    trim: true
  },
  quantity: {
    type: String,
    required: true,
    trim: true
  },
  dietaryRestrictions: {
    type: String,
    trim: true
  },
  urgency: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  requesterId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Fulfilled', 'Rejected'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

FoodRequestSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('FoodRequest', FoodRequestSchema);