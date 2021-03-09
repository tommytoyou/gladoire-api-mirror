const db = require('../models')
const mongoose = require('mongoose')


const check_access = async(id, level)=>{
    const user = await db.User.findOne({_id: id})
    console.log(`User level: ${user.user_level}, Param level: ${level}`)
    if (user.user_level >= level){
        console.log("user should have access")
        return true
    }else{
        console.log("user should not have access")
        return false
    }
}

module.exports = {
    check_access,
}