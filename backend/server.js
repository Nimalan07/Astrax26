const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
const crypto = require('crypto');
require('dotenv').config();

const app = express();

// Configure CORS to allow access from local/production frontends
app.use(cors({
  origin: '*', // Set to specific URL in production for safety
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Initialize Razorpay client
// Key ID and Secret will be fetched from environmental variables (.env)
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'dummy_key_id',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_key_secret'
});

// Test endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', time: new Date() });
});

// Endpoint: Create Razorpay Order ID
app.post('/create-order', async (req, res) => {
  try {
    const { amount } = req.body;
    
    if (!amount) {
      return res.status(400).json({ error: 'Amount is required' });
    }

    const options = {
      amount: Math.round(Number(amount) * 100), // Razorpay expects amount in paise (e.g. 50 INR = 5000 paise)
      currency: 'INR',
      receipt: `receipt_order_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ error: 'Failed to create order', details: error.message });
  }
});

// Endpoint: Verify Razorpay Payment Signature
app.post('/verify-payment', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Missing payment signature details' });
    }

    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'dummy_key_secret')
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature === expectedSign) {
      // Payment is verified and authentic
      // In production, save order details and user registration here
      res.status(200).json({ status: 'success', message: 'Payment verified successfully' });
    } else {
      res.status(400).json({ status: 'failure', message: 'Invalid payment signature' });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ error: 'Verification failed', details: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Astra X backend server listening on port ${PORT}`);
});
