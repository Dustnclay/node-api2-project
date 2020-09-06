const port = 5000;

const express = require('express');
const db = require('./data/db.js')
const postRouter = require('./data/posts/postsRouter')

const server = express();
server.use('/api/posts', postRouter);

// //--get ('/')----//
// server.get('/api/posts', (req,res) => {
//     res.send('SERVER!!!')
// })

// //--post ('/')----//
// server.post('/api/posts', (req,res) => {
//     res.status(401).send('post in the /a/pi/posts')
// })

// //--post ('/:id/comments')----//
// server.post('/api/posts/:id/comments', (req,res) => {
//     res.status(201)
// })
// //-get ('/:id')-----//
// server.get('/api/posts/:id', (req,res) => {
//     res.status(200)
// })
// //--get ('/:id/comments')----//
// server.get('/api/posts/:id/comments', (req,res) => {
//     res.status(200)
// })
// //--delete ('/:id')----//
// server.delete('/api/posts/:id', (req,res) => {
//     res.status(200)
// })
// //--put ('/:id')----//
// server.put('/api/posts/:id', (req,res) => {
//     res.status(200)
// })


 
server.listen(port, () => {
    console.log(`server is listening ye olde port ${port}`)
});