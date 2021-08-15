const express = require('express')
const path = require("path")
const cors= require('cors')
const bodyParser=require('body-parser')

const password = 'eq1WUdDQj8mAnj9';

const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const { response } = require('express');
// Connection URL


const uri = "mongodb+srv://secondUser:eq1WUdDQj8mAnj9@cluster0.y9efi.mongodb.net/database1_resultPublish?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();

//

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))



// app.use(express.static('public'));
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/public/index.html')
// })
// href="./style.css"
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
app.get('/style_css', (req, res) => {
    res.sendFile(path.join(__dirname + '/style.css'))
})
app.get('/admin_login_html', (req, res) => {
    res.sendFile(path.join(__dirname + '/admin_login.html'))
})
app.get('/admin_login_css', (req, res) => {
    res.sendFile(path.join(__dirname + '/admin_login.css'))
})

// adResult path
app.get('/teacher1_611432f1499369e51ee2b69f', (req, res) => {
    res.sendFile(path.join(__dirname + '/teacher1_add.html'))
})
app.get('/teacher2_6114336c499369e51ee2b6a0', (req, res) => {
    res.sendFile(path.join(__dirname + '/teacher2_add.html'))
})
app.get('/teacher3_611598ae684a8c8aad40cfad', (req, res) => {
    res.sendFile(path.join(__dirname + '/teacher3_add.html'))
})
app.get('/teacher4_611598e3684a8c8aad40cfae', (req, res) => {
    res.sendFile(path.join(__dirname + '/teacher4_add.html'))
})

//
app.get('/teacherAll_add_css', (req, res) => {
    res.sendFile(path.join(__dirname + '/teacherAll_add.css'))
})
app.get('/added_text_page', (req, res) => {
    res.sendFile(path.join(__dirname + '/added-text-page.html'))
})
app.get('/script_js', (req, res) => {
    res.sendFile(path.join(__dirname + '/script.js'))
}) 


//connect to db
// Use connect method to connect to the Server
client.connect(err => {
    const teacherInfoCollection = client.db("database1_resultPublish").collection("collection1_teachersInfo");
    const studentsInfoCollection = client.db("database1_resultPublish").collection("collection1_studentsInfo");
    const resultCollection = client.db("database1_resultPublish").collection("collection1_result");

    // perform actions on the collection object
    console.log("Database connected");
    //teachers login info
    app.get('/teachersInfo', (req,res) => {
        teacherInfoCollection.find({})
        .toArray((err, documents) => {
            // console.log(documents, err);
            res.send(documents)
        })
    })

    // teacher per one data get
    app.get('/admin_matched/:id', (req,res) => {
        const id = req.params.id;
        console.log('one teacher ', id)
        teacherInfoCollection.find({_id: ObjectId(id)})
        .toArray((err, documents) => {
            // console.log(documents, err);
            res.send(documents[0])
            // console.log(documents)
        })
    })

    //redirect to teacher1_611432f1499369e51ee2b69f
    app.get('/teacher1_611432f1499369e51ee2b69f', (req,res) => {
        res.sendFile(__dirname + '/teacher1_611432f1499369e51ee2b69f')
    })
      //redirect to teacher1_611432f1499369e51ee2b69f
    app.get('/teacher2_6114336c499369e51ee2b6a0', (req,res) => {
        res.sendFile(__dirname + '/teacher2_6114336c499369e51ee2b6a0')
    })
 //redirect to teacher1_611432f1499369e51ee2b69f
 app.get('/teacher3_611598ae684a8c8aad40cfad', (req,res) => {
    res.sendFile(__dirname + '/teacher3_611598ae684a8c8aad40cfad')
})
 //redirect to teacher1_611432f1499369e51ee2b69f
 app.get('/teacher4_611598e3684a8c8aad40cfae', (req,res) => {
    res.sendFile(__dirname + '/teacher4_611598e3684a8c8aad40cfae')
})

// add t1 info result
    app.post('/addT1', (req,res) => {
        let result = req.body;
        console.log(result, 'result added......')
        const sem = result.sem;
        const sub = result.subject;
        const cgpa = result.cgpa;
        if((((sem=='sem10' && sub=='programming-language-java') || (sem=='sem10' && sub=='data-structure') || (sem=='sem10' && sub=='computer-graphics') || (sem=='sem10' && sub=='structural-programming-language'))   ||   ((sem=='sem11' && sub=='programming-language-java-lab') || (sem=='sem11' && sub=='discrete-mathematics') || (sem=='sem11' && sub=='computer-graphics-lab') || (sem=='sem11' && sub=='web-programming'))) &&  cgpa <= 4.00)
        {
            console.log(result)
        resultCollection.insertOne(result)
        .then(result => {
            console.log('data added', result)
        })
        res.redirect('/added_text_page');
        }
        // end if
        else{
            res.write('You have selected wrong course for wrong semester, or cgpa is greater then 4.00');
            res.write(' Please try again and go back to previous path to add')
        }
        res.end();
    })

    app.get('/getAllResult', (req, res) => {
        resultCollection.find({})
        .toArray((err, documents) => {
            console.log(documents)
            res.send(documents)
        })
    })



    //studentsInfo
    app.get('/studentsInfo', (req,res) => {
        studentsInfoCollection.find({})
        .toArray((err, documents) => {
            // console.log(documents);
            res.send(documents)
        })
    })


    //connect sesh ekhane-
  });
  




app.listen('3100', console.log("listening to port 3100"))