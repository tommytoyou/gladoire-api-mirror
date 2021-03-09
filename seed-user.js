const db = require('./models')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const addUsers = () =>{
    let userList = {
        display_name: "Gladoire Admin",
        email: "plectrumonthespectrum@gmail.com",
        password: "Nytt3mp1ar",
        user_level: 10
    }

    let tempCounter = 0
    let loopCounter = 0

    //create a new user
    const newUser = new db.User(userList)
    bcrypt.genSalt(10, (err, salt) =>{
        if (err) throw Error;

        bcrypt.hash(newUser.password, salt, (err, hash)=>{
            if (err) throw Error;
            newUser.password = hash
            newUser.save()
                .then(createdUser => console.log(createdUser))

        })

    })
}

addUsers()