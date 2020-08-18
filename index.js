const express = require('express');
const mongodb = require('mongodb');
const app = express();
// const url = "mongodb://localhost:27017";
const url = "mongodb+srv://moneyManager:moneyManagerPassword@money-app.nozvq.mongodb.net/<dbname>?retryWrites=true&w=majority";
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 4040;

app.use(cors());
app.use(bodyParser.json())
var ObjectId = require('mongodb').ObjectID;


app.get('/', async (req,res) => { 
    try {
        res.send("money manager");
    }
    catch (error) {
        res.status(500).json({
            message: "Something Went Wrong"
        })
    }
})

app.get('/fetch', async (req, res) => {
    try {
        const client = await mongodb.connect(url, {
            useUnifiedTopology: true
        });
        const db = await client.db("money-manager");
        const data1 = await db.collection("money").find().toArray();
        console.log(data1);
        await client.close();
        res.json({
            items: data1
        });
    } catch (error) {
        res.status(500).json({
            message: "Something Went Wrong"
        })
    }
})

app.post('/insert', async (req, res) => {
    console.log(req.body)
    try {
        const client = await mongodb.connect(url, {
            useUnifiedTopology: true
        });
        const db = await client.db("money-manager");
        const data = await db.collection("money").insertOne(req.body);
        console.log(data);
        await client.close();
        res.json({
            message: "added"
        })
    } catch (err) {
        res.json({
            message: err.message
        })
    }
})



app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

