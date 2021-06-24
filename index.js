const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 5000;
const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.psabv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
app.get('/', (req, res) => {
    res.send('Hello World');
})



const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, });
client.connect((err) => {
    const collection = client.db("repairMan").collection("serviceReviews");
    
    app.post('/reviews', (req, res) => {
        const reviews = req.body;
        collection.insertOne(reviews)
            .then(result => {
            res.send(result.insertedCount > 0)
        })
    })

});



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});