const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Post = require('../models/postSchema.js')
const fs = require('fs')
const path = require('path')
const { title } = require('process')

//get
router.get('/', async (req, res)=>{
    try{  
        const posts = await Post.find()
 
        fs.readFile(path.join('server',  'index.html'), (err, data) => {
            if (err) { throw err }
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.write(
                `<section>${posts[0].title}</section>`
                //  <img src="${posts[1].url}" alt="picture" /><br/>
                //  <img src="${posts[2].url}" alt="picture" /><br/>
                //  <img src="${posts[3].url}" alt="picture" />
                )
            res.end(data)
        })      
    }
    catch(e){
        throw new Error(e)
    }
})

//for front
router.get('/posts', async (req, res)=>{
    try{
        const posts = await Post.find()
        res.send(posts)       
    }
    catch(e){
        throw new Error(e)
    }
})

//add
router.post('/create', async (req, res)=>{
    try{
        
        const post = new Post({
            _id: req.body.id,
            title: req.body.title,   //req.body.titleText value from browser
            content: req.body.content, //req.body.content value from browser
            url: req.body.url
        });
    
        await post.save(); // await, because return promise
        console.log('post created')
        res.redirect('/')
       // res.send({message: 'post created'})
    }
    catch(e){
        throw new Error(e)
    }
})
//delete
router.post('/delete', async (req, res)=>{
    try{
        await Post.deleteOne({_id: `${req.body.id_for_del}`})  //new mongodb.ObjectID
        
        console.log(`post  deleted`)
        res.redirect('/')
       // res.send({message: 'post created'})
    }
    catch(e){
        throw new Error(e)
    }
})

module.exports = router