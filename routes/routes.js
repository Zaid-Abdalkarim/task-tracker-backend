const express = require('express')
const router = express.Router()
const List = require('../schemas/question-schema')
var secured = require('../lib/middleware/secured');
// const indexRouter = require('../frontend/index.jsx')
// Route getting questions, route getting one question, route getting list of questions of a certain type
// route for making new question
// route for updating question
// route for deleting question



//working get all lists
router.get('/lists', async(req, res) => {
    try {
        const lists = await List.find()
        res.send(lists)
        return res.status(200).json(lists)
    } catch (error) {
        return res.status(500).json({"error": error})
    }
})

// working get one list
router.get('/lists/:id', async(req, res) => {
    try {
        const _id = req.params.id 

        const list = await List.findOne({_id})        
        if(!list){
            return res.status(404).json({})
        }else{
            return res.status(200).json(list)
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// working create one list
router.post('/lists', async (req, res) => {
    try{
        const newList = await List.create({
            list_name : req.body.list_name
        })
        
        await newList.save()
        console.log('were making a new list' + req.body.list_name)
        return res.status(200).json(newList)
    } catch(error){
        return res.status(500).json({"error": error})
    }
})

//working get one task
router.get('/lists/:list/:task', async (req, res) => {
    try {
        const _list = req.params.list 
        const _task = req.params.task
        console.log(_task)
        const list = await List.findOne({_id: _list})
        for (let index = 0; index < list.task.length; index++) {
            if(req.params.task = list.task[index]._id)
                return res.status(200).json(list.task[index])
        }
        return res.status(404).json({})
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// working put new task
router.post('/lists/:list', async (req, res) => {
    try {
        console.log(req.body)
        console.log(await List.findOne({_id: req.params.list}))
        const question = await List.findOneAndUpdate({"_id": req.params.list}, {"$push": {task:{"text": req.body.text}}}, {new:true})

        if (!question)
            return res.status(404).json({})
        else
            console.log(question)
            return res.status(200).json(question)
            
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

router.put('/lists/:list/:task', async (req, res) => {
    try {
        console.log(req.body)
        console.log(await List.findOne({_id: req.params.list}))
        const question = await List.updateOne({"_id": req.params.list, "task._id": req.params.task}, {"$set": {"task.$.text": req.body.text}}, {new:true})

        if (!question)
            return res.status(404).json({})
        else
            console.log(question)
            console.log(req.body)
            return res.status(200).json(question)
            
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

//working delete one list question
router.delete('/lists/:id', async(req, res) => {
    try {
        const _id = req.params.id 

        const question = await List.deleteOne({_id})

        if(question.deletedCount === 0){
            return res.status(404).json()
        }else{
            return res.status(204).json()
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

//working delete one task
router.delete('/lists/:list/:task', async(req, res) => {
    try {
        const list = await List.findByIdAndUpdate(req.params.list, {$pull: {"task": {_id: req.params.task}}}, {safe: true, upsert: true})

        console.log(list)

        if(list.deletedCount === 0){
            return res.status(404).json()
        }else{
            return res.status(204).json()
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

module.exports = router


//this is a duplicate idk? 
// router.put('/questions/:list/:task', async (req, res) => {
//     try {
//         const _task = req.params.task
//         const question = await Question.findOneAndUpdate({"task._id": _task}, {$set: {task:{"text": req.body.text}}}, {new:true}, (err, doc) => {
//             if (err) {
//                 console.log("something went wrong")
//             }
//             console.log(doc);
//             return res.status(200).json(doc)
//         })

//         console.log(question.task[0])

//         return res.status(404).json({})
        
//     } catch (error) {
//         return res.status(500).json({"error":error})
//     }
// })