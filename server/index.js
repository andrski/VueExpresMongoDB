const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const posts = require('./routes/posts.js')



const app = express()
const PORT = process.env.PORT || 5000
//MongoAtlas
const uri = 'mongodb+srv://vue-express:vue-express@cluster0.dbofr.mongodb.net/vue-express?retryWrites=true&w=majority'

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.use(posts)

//HANDLE PRODUCTION
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(__dirname + '/public/'))
    //handle SPA
    // any routes from all
    app.get(/.*/, (req, res)=>{
        res.sendFile(__dirname + '/public/index.html')
    }) 
}

async function start(){
    try{
            // mongoDB atlas pw: user_mern
        await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    console.log('data base connected')
    app.listen(PORT, ()=>(console.log(`Server has been started on port ${PORT}`)));
    }
    catch(e){
        console.log('server Error', e.message)
        process.exit() // need be code:1
    }
}
start()