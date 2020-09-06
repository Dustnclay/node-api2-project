const express = require('express');
const router = express.Router();
const db = require('../../data/db')


//--get ('/')----//
router.get('/', (req,res) => {
    try{
        db.find()
        .then(answer => res.status(200).send(answer))
        
    }catch{
        res.status(500).json({message:"The information could not be retrieved."});
    }
    
})

//--post ('/')----//
router.post('/', (req,res) => {
    console.log(req.body)
    try{
        db.insert(req.body)
        .then( response =>
            res.status(401).json(response)             
        ).catch( err =>
            res.status(200).json({message: "you dont got it"}) 
        )
   
    }catch{
        res.status(500).json({message:"The users information could not be posted."});
    }

})

//--post ('/:id/comments')----//
router.post('/:id/comments', (req,res) => {
    const {id} = req.params
    try{
        res.status(201).send(`post ${id} comment`)    
    }catch{
        res.status(500).json({message:"The users information could not be posted."});
    }

})
//-get ('/:id')-----//
router.get('/:id', (req,res) => {
    const {id} = req.params
    try{
        res.status(200).send('get id')    
    }catch{
        res.status(500).json({message:"The information could not be retrieved."});
    }

})
//--get ('/:id/comments')----//
router.get('/:id/comments', (req,res) => {
    const {id} = req.params
    try{
        res.status(200).send('get comments')    
    }catch{
        res.status(500).json({message:"The information could not be retrieved."});
    }
})
//--delete ('/:id')----//
router.delete('/:id', (req,res) => {
    const {id} = req.params
    try{
        res.status(200).send('delete id')    
    }catch{
        res.status(500).json({message:"The information could not be deleted."});
    }

})
//--put ('/:id')----//
router.put('/:id', (req,res) => {
    const {id} = req.params
    try{
        res.status(200).send('put id')
    }catch{
        res.status(500).json({message:`The informationat ${id}could not be edited.`});    
    }
    
})

module.exports = router;

