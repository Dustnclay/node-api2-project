const express = require('express');
const router = express.Router();
const db = require('../../data/db');


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

router.get('/:id', (req,res) => {
    const {id} = req.params
    try{
        db.findById(id)
            .then( isthere => {
                console.log(isthere[0])
                isthere[0] !== undefined?
                    res.status(200).json(isthere):
                    res.status(400).json({message:"no id found"})
                }
            ).catch( err =>
                res.status(400).json({message:"coulndt go through with it.."})
            )
    }catch{
        res.status(500).json({message:"The information could not be retrieved."});
    }

})
//--post ('/:id/comments')----// todo- id
router.post('/:id/comments', (req,res) => {
    const {id} = req.params
    const comment = req.body
    comment.post_id = id
    try{
        if(comment.text){
            db.findById(id)
                .then(foundid =>{
                    if(foundid[0] !== undefined){
                        db.insertComment(comment)
                        .then(com =>
                            res.status(201).json(comment))
                        .catch(err =>
                            res.status(400).json(err))
                    }else{
                        res.status(404).json({message:"id doesnt exist"})
                    }
                })
        }else{
            res.status(400).json({message:"add text field"})
        }
    }catch{
        res.status(500).json({message:"The users information could not be posted."});
    }

})

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

router.delete('/:id', (req,res) => {
    const {id} = req.params
    try{
        db.findById(id)
            .then( deletedobj =>{
                   if(deletedobj[0] !== undefined) {
                        db.remove(id)
                        .then(found =>
                            res.status(200).json(deletedobj)
                        ).catch( err=>
                            res.status(200).json({message:"could not delete"}))
                    }else{
                        res.status(404).json({message:"id doesnt exist"})}}      
            ).catch( err =>
                res.status(400).json({message:"coulndt go through with it.."}))
    }catch{
        res.status(500).json({message:"The information could not be deleted."});
    }
})

router.put('/:id', (req,res) => {
    const {id} = req.params
    const changes = req.body

    try{
        db.findById(id)
        .then(foundid =>{
            if(foundid[0] !== undefined){
                db.update(id,changes)
                .then(success => res.status(200).json(changes))
                .catch(err => 
                   res.status(400).json({message:"could not update"}) )
            }else{
                res.status(400).json({message:"id does not exist"})}
        })
    }catch{
        res.status(500).json({message:`The informationat ${id}could not be edited.`});    
    }
    
})

module.exports = router;

