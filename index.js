const express = require('express')
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// userName: furnitureBazar
// pass: qcCnvGBOxjuOdfxg

// middleware
app.use(cors())
app.use(express.json())




const uri = "mongodb+srv://furnitureBazar:qcCnvGBOxjuOdfxg@cluster0.rz3ftkv.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri,{ useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
  try {
    //connect client to mongoDB
    await client.connect();
    
    // myDB
    const furnitureDB = client.db("furnitureDB");
    //myCollections
    const productCollection = furnitureDB.collection("productCollection");
    const newFurniture = furnitureDB.collection("newFurniture");
    const furnitureBlog = furnitureDB.collection("furnitureBlog");


    // try 
    const doc = {
        title: "demo title",
        content: "demo content",
      }

      app.post('/demo', async(req, res)=>{
        const result = await furnitureBlog.insertOne(doc)
        res.send(result)
      })


      //*********** get all products from product collection
      app.get('/furniture', async(req, res)=>{
        const query = {}
        const result = await productCollection.find(query).toArray()
        res.send(result)
      })
      //*********** get single product from product collection
      app.get('/furniture/:id', async(req, res)=>{
        const id = req.params.id
        const query = {_id: new ObjectId(id)}
        const result = await productCollection.findOne(query)
        res.send(result)
      })

      //*********** get all New furniture from newFurniture collection
      app.get('/newFurniture', async(req, res)=>{
        const query = {}
        const result = await newFurniture.find(query).toArray()
        res.send(result)
      })
    

      //*********** get all Blogs from furnitureBlog collection
      app.get('/furnitureBlog', async(req, res)=>{
        const query = {}
        const result = await furnitureBlog.find(query).toArray()
        res.send(result)
      })
    
  } finally {
    
  }
}
run().catch(err => console.log(err));


app.get('/', (req, res) => {
  res.send('Furniture server is running')
})

app.listen(port, () => {
  console.log(`Furniture server is running on port ${port}`)
})