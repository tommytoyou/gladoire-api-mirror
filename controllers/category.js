require('dotenv').config
const db = require('../models')

const jwt = require('jsonwebtoken')
const {JWT_SECRET} = process.env

const passport = require('passport')
const {check_access} = require('../utils/checks')


const get_all = async(req,res)=>{
    if (await check_access(req.user.id, 3)) {
        const categories = await db.Category.find()
        res.json(categories)
    }else{
        res.status(400).json({error: "User does not have access to this resource"})
    }
}

const update = async(req,res)=>{
    if (check_access(req.user.id, 3)){
        const updCat = {
            name: req.body.name,
            description: req.body.description
        }
        await db.Category.updateOne({_id: req.params.id}, updCat)

    }else{
        res.status(400).json({error: "User does not have access to this resource"})
    }
}

const create = async(req,res)=>{
    if (check_access(req.user.id, 3)){
        const newCat = {
            name: req.body.name,
            description: req.body.description
        }
        const created = db.Category.create(newCat)
        res.json(created)
    }else{
        res.status(400).json({error: "User does not have access to this resource"})
    }
}

const deleteCat = async(req,res)=>{
    if (check_access(req.user.id, 3)){
        const deleted = db.Category.remove({_id: req.params.id})
        res.json(deleted)
    }else{
        res.status(400).json({error: "User does not have access to this resource"})
    }
}






//Exports
module.exports = {
    get_all,
    update,
    create,
    deleteCat

}
