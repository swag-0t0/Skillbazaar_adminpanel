import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  gigId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gig',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  total_amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  tran_id: {
    type: String,
    required: true,
  },
  cus_name: {
    type: String,
    required: true,
  },
  cus_email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  postcode: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^\d{11}$/.test(v);
      },
      message: props => `${props.value} is not valid!`
    }
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Payment = mongoose.model('Payment', PaymentSchema);
export default Payment;