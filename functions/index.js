const functions = require('firebase-functions');
const express = require('express');
const app = express();

const cors = require('cors')({origin: true});

const stripe = require("stripe")(process.env.STRIPE_KEY);

app.use(cors);
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Amazon');
})

app.post('/payments/create', (req, res) => {
  cors(req, res, async () => {
    const total = req.query.total;
    console.log("payment request received", total);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "inr",
      description: "amazon clone test development stripe payment. *Just for testing*"
    });

    res.status(201).send({
      clientSecret: paymentIntent.client_secret
    });
  });
});

exports.api = functions.https.onRequest(app);


