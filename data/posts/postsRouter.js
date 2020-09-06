const express = require('express');
const router = express.Router();
const db = require('../../data/db');
const { findById } = require('../../data/db');

router.get('/', (req,res) => {
    try{
        db.find()
        .then(answer => res.status(200).send(answer))
    }catch{
        res.status(500).json({message:"The information could not be retrieved."});
    }
})

router.post('/', (req,res) => {
    const post = req.body
    try{
        if(post.title && post.contents){
        db.insert(post)
        .then( response =>
            res.status(201).json(post)             
        ).catch( err =>
            res.status(400).json({message: "post not saved"}) 
        )            
    }else{
        res.status(400).json({message:"add title or contents"})
    }

   
    }catch{
        res.status(500).json({message:"The users information could not be posted."});
    }

})

//-get ('/:id')-----//############################### error message to send no id
router.get('/:id', (req,res) => {
    const {id} = req.params
    try{
        db.findById(id)
            .then( isthere => {
                console.log(isthere)
                if(isthere){
                res.status(200).json(isthere) 
                }else{
                res.status(400).json({message:"no id found"})
                }
            }

            ).catch( err =>
                res.status(400).json({message:"coulndt go through with it.."})
            )
    }catch{
        res.status(500).json({message:"The information could not be retrieved."});
    }

})
//--post ('/:id/comments')----//
router.post('/:id/comments', (req,res) => {
    const {id} = req.params
    const comment = req.body
    comment.post_id = id
    try{
        if(comment.text){
            db.insertComment(comment)
                        .then(com =>
                            res.status(201).json(comment))
                        .catch(err =>
                            res.status(400).json(err))
        }else{
            res.status(400).json({message:"add text field"})
        }
        
           
    }catch{
        res.status(500).json({message:"The users information could not be posted."});
    }

})
//--get ('/:id/comments')----//######################
router.get('/:id/comments', (req,res) => {
    const {id} = req.params
    const comment = req.body
    comment.post_id = id
    try{
        db.findPostComments(id)
            .then(comments =>
                res.status(200).json(comments) 
            ).catch(err =>
                res.status(400).json(err))
    }catch{
        res.status(500).json({message:"The information could not be retrieved."});
    }
})
//--delete ('/:id')----//########################################
router.delete('/:id', (req,res) => {
    const {id} = req.params
    try{
        db.findById(id)
            .then( deletedobj =>
                db.remove(id)
                    .then(yesyes => console.log(deletedobj),
                    res.status(200).json(deletedobj)
                    ).catch( err=>
                        res.status(200).json({message:"id doesnt exist"})
                    )               
            ).catch( err =>
                res.status(400).json({message:"coulndt go through with it.."})
            )

    }catch{
        res.status(500).json({message:"The information could not be deleted."});
    }

})
//--put ('/:id')----//################################
router.put('/:id', (req,res) => {
    const {id} = req.params
    const changes = req.body

    try{
        db.update(id,changes)
        .then(res.status(200).json(changes))
    }catch{
        res.status(500).json({message:`The informationat ${id}could not be edited.`});    
    }
    
})

module.exports = router;

