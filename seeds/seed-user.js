const db = require('../models')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const addUsers = () =>{
    let userList = [{
        display_name: "Gladoire Admin",
        email: "plectrumonthespectrum@gmail.com",
        password: "password123",
        user_level: 10
    },
        {
            display_name: "Gladoire Dev",
            email: "ngenjung@gmail.com",
            password: "password123",
            user_level: 10
        },
        {
            display_name: "Anchorite 1",
            email: "user1@gladoire.com",
            password: "password123",
            user_level: 3,
            is_active: 1
        },
        {
            display_name: "Anchorite 2",
            email: "user2@gladoire.com",
            password: "password123",
            user_level: 3,
            is_active: 1
        },
        {
            display_name: "Anchorite 3",
            email: "user3@gladoire.com",
            password: "password123",
            user_level: 3,
            is_active: 1
        },
        {
            display_name: "Anchorite 4",
            email: "user4@gladoire.com",
            password: "password123",
            user_level: 3,
            is_active: 1
        },
        {
            display_name: "Anchorite 5",
            email: "user5@gladoire.com",
            password: "password123",
            user_level: 3,
            is_active: 1
        }

    ]


    for (let user of userList) {
        const newUser = new db.User(user)
        bcrypt.genSalt(10, (err, salt) => {
            if (err) throw Error;

            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw Error;
                newUser.password = hash
                newUser.save()
                    .then(createdUser => console.log(createdUser))

            })

        })
    }
}

addUsers()