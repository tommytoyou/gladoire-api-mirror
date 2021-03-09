//TODO: finish journal DB functions

require('dotenv').config
const db = require('../models')

const jwt = require('jsonwebtoken')
const {JWT_SECRET} = process.env

const passport = require('passport')


const create_full = async(req,res)=>{
    let newEntry = {
        user: req.user.id,
        date: req.body.date,
        duration: req.body.duration,
        mood_pre: req.body.mood_pre,
        mood_post: req.body.mood_post,
        energy_pre: req.body.energy_pre,
        energy_post: req.body.energy_post,
        tags: req.body.tags,
        location: req.body.location,
        moon_phase: req.body.moon_phase,
        notes: req.body.notes,
        user_fields: req.body.user_fields,
        bg_music: req.body.bg_music

    }
    res.json(await db.Journal.create(newEntry))
}

const create_post = async(req,res) => {
    let newEntry = {
        user: req.user.id,
        duration: req.body.duration,
        bg_music: req.body.bg_music,
        moon_phase: req.body.moon_phase
    }
    res.json(await db.Journal.create(newEntry))
}

const update = async(req, res)=>{
    let updatedEntry = {
        duration: req.body.duration,
        mood_pre: req.body.mood_pre,
        mood_post: req.body.mood_post,
        energy_pre: req.body.energy_pre,
        energy_post: req.body.energy_post,
        tags: req.body.tags,
        location: req.body.location,
        moon_phase: req.body.moon_phase,
        notes: req.body.notes,
        user_fields: req.body.user_fields,
        bg_music: req.body.bg_music,
        date: req.body.date
    }
    updated = await db.Journal.updateOne({id: req.params.id}, updatedEntry)
    res.json(updated)
}

const list_all = async(req,res)=>{
    let jData = []
    let journalData = await db.Journal.find({user: req.user.id})
    for (let journal of journalData) {
        jData.push({date: journal.date, duration: journal.duration, partial_notes: journal.notes.substr(0, 150) + "..."})
    }
    res.json(jData)
}

const get_one = async(req, res)=>{
    const journalData = await db.Journal.findOne({_id: req.params.id})
    console.log(`req.user.id: ${req.user.id}`)
    console.log(`journalData user id: ${journalData.user}`)
    if (req.user.id == journalData.user) {
        res.json(journalData)
    }else{
        res.status(400).json({error: "User is not owner of requested journal entry"})
    }
}

const delete_item = async(req,res)=>{
    const journalData = await db.Journal.findOne({_id: req.params.id})
    if (req.user.id == journalData.user){
        let deleted = await db.Journal.remove({_id: journalData.id, user: req.user.id})
        res.json(deleted)
    }else{
        res.status(400).json({error: "User is not owner of journal entry..."})
    }
}


module.exports = {
    create_full,
    update,
    create_post,
    list_all,
    get_one,
    delete_item
}