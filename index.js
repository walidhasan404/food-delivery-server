require('dotenv').config();
const express = require('express');
// const stripe = require("stripe")(process.env.STRIPE_SECRET);
const app = express();
const cors = require('cors');
// var jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const PORT = process.env.PORT || 5000;

// Middleware
//Must remove "/" from your production URL
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://food-delivery-f138b.web.app",
      "https://food-delivery-f138b.firebaseapp.com",
    ],
  })
);
app.use(express.json());


  const uri = 
  `mongodb+srv://${process.env.DB_user}:${process.env.DB_pass}@cluster0.s2dzxgz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection

    const foodsCollection = client.db("food-delivery").collection("foods");

    app.get("/foods", async (req, res) => {
      const foods = await foodsCollection.find().toArray();
      res.send(foods);
    })

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Project is running');
})
app.listen(PORT, () => {
    console.log(`app is running at http://localhost:${PORT}`)
})
