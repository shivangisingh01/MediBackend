require('dotenv').config();
const express = require('express');
const Razorpay = require('razorpay');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth'); 
const appointmentRoutes = require('./routes/appointment'); 
const feedbackRoutes = require('./routes/feedback'); 
const consultationRoutes = require('./routes/consultation'); 
const cors = require('cors');

const app = express();

// Configure CORS options
const corsOptions = {
  origin: 'http://localhost:5174', // Replace with your frontend URL
  credentials: true, // Allow credentials
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Define allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Define allowed headers
};

// Apply CORS middleware with the defined options
app.use(cors(corsOptions));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

//Middleware to parse JSON bodies app.use(bodyParser.json());
// app.use(express.json());
 // Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Connection error', err);
  });


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',() => {
  console.log('Connected to MongoDB');
}
);



app.post('/orders', async(req, res) => {
  const razorpay = new Razorpay({
      key_id: 'rzp_test_DSzFk0Dp7MK46c',
      key_secret: '00sxrfQwVFy2SBwELHzPr3hi'
  });
  const options = {
      amount: req.body.amount,  // amount in smallest currency unit
      currency: req.body.currency,
      receipt: "order_rcptid_11",
      payment_capture: 1
  };
  try{
      const response = await razorpay.orders.create(options);
      res.json({
          order_id: response.id,
          amount: response.amount,
          currency: response.currency,
      });
  } catch(error){
     res.status(500).send("Internal Server Error")
  }
})
app.get("/payment/:paymentId", async(req, res) =>{
  const {paymentId} = req.params;
  const razorpay = new Razorpay({
      key_id: 'rzp_test_DSzFk0Dp7MK46c',
      key_secret: '00sxrfQwVFy2SBwELHzPr3hi'
  });
  try{
      const payment = await razorpay.payments.fetch(paymentId)

      if(!payment){
          return res.status(500).json("Error at razorpay loading")
      }

      res.json({
          status: payment.status,
          amount: payment.amount,
          currency: payment.currency,
          method: payment.method,

      })
  }catch(error){
      res.status(500).json("failed to fetch")
  }
})
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/feed', feedbackRoutes);
// app.use('/api/doctors', docRoutes);

app.use('/api/consultation', consultationRoutes);
// Start the server
const PORT = process.env.PORT || 6005;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

