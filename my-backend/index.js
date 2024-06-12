const express = require('express')
const cors= require('cors')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000;


app.use(cors())
app.use(express.json())

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.rqq4klv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
  
      const database = client.db('ReactNative');
      const itemsCollection = database.collection('items');
  
      // CREATE: Add a new item
      app.post('/items', async (req, res) => {
        const newItem = req.body;
        console.log(newItem);
        const result = await itemsCollection.insertOne(newItem);
        res.send(result);
      });
  
      // READ: Get all items
      app.get('/items', async (req, res) => {
        const items = await itemsCollection.find().toArray();
        res.send(items);
      });
  
      // UPDATE: Update an item by id
    //   app.put('/items/:id', async (req, res) => {
    //     const id = req.params.id;
    //     const updatedItem = req.body;
    //     const result = await itemsCollection.updateOne(
    //       { _id: new MongoClient.ObjectID(id) },
    //       { $set: updatedItem }
    //     );
    //     res.send(result);
    //   });
  
      // DELETE: Delete an item by id
    //   app.delete('/items/:id', async (req, res) => {
    //     const id = req.params.id;
    //     const result = await itemsCollection.deleteOne({ _id: new MongoClient.ObjectID(id) });
    //     res.send(result);
    //   });
    } catch (error) {
      console.error(error);
    }
  }
  
  run().catch(console.dir);
  


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})