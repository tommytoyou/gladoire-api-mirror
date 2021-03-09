require('dotenv').config
const db = require('../models')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = process.env

const passport = require('passport')


const test = (req,res) =>{
    res.json({
        message: 'user endpoint OK'
    })
}

const register = (req,res) =>{
    console.log("=========REGISTER==========")
    console.log(req.body.display_name)

    db.User.findOne({email: req.body.email})
        .then(user =>{
            //email already exists
            if(user){
                return res.status(400).json({message: 'email already exists'})
            }else{
                //create a new user
                const newUser = new db.User({
                    display_name: req.body.display_name,
                    email: req.body.email,
                    password: req.body.password
                })
                bcrypt.genSalt(10, (err, salt) =>{
                    if (err) throw Error;

                    bcrypt.hash(newUser.password, salt, (err, hash)=>{
                        if (err) throw Error;
                        newUser.password = hash
                        newUser.save()
                            .then(createdUser => res.json(createdUser))
                    })

                })
            }
        })
        .catch(err => console.log('Error in user lookup'))


}

const login = async(req, res)=>{
    console.log("=========LOGIN==========")
    console.log(req.body)
    const theUser = await db.User.findOne({email: req.body.email})
    if (theUser){
        let isMatch = await bcrypt.compare(req.body.password, theUser.password)
        console.log(`*****isMatch: ${isMatch}`)
        if (isMatch){
            //create token payload
            const payload = {
                id: theUser._id,
                email: theUser.email,
                access: theUser.user_level,
                name: theUser.name
            }
            jwt.sign(payload, JWT_SECRET, {expiresIn: 21600}, (err, token)=>{
                if (err){
                    console.log(`##########Somethings wrong...`)
                    console.log(err)
                    res.status(400).json({message: 'Session has ended, please log in again...'})
                }
                const legit = jwt.verify(token, JWT_SECRET, { expiresIn: 60})
                console.log(`####LEGIT:`)
                console.log(legit)
                res.json({success: true, token: `Bearer ${token}`, userData: legit})
            })

        }else{
            res.status(400).json({message: 'User or password incorrect'})
        }
    }else{
        res.status(400).json({message: 'User or password incorrect.  Probably user.'})
    }
}

//private
const profile = async(req, res) =>{
    console.log(`=============> inside /profile`)
    console.log("======> User:")
    userInfo = await db.User.findOne({_id: req.user.id})
    const {id, display_name, email, custom_fields, is_hidden, bg_urls} = userInfo
    res.json({id, display_name, email, custom_fields, is_hidden, bg_urls})
}

const updateProfile = async(req, res)=>{
    console.log("==========> Updating profile")
    const updatedProfile = {
        display_name: req.body.display_name,
        custom_fields: req.body.custom_fields,
        email: req.body.email,
        is_hidden: req.body.is_hidden,
        bg_urls: req.body.bg_urls

    }
    let update = await db.User.updateOne({_id: req.user.id}, updatedProfile)
    res.json(await db.User.findOne({_id: req.user.id}))
}


const doc = (req, res) => {
    console.log("============> Inside /doc")
    const retData = {
        top_level: "/api/v0/auth",
        num_routes: 5,
        routes: [
            {route: "/register", requires_auth: false, method: "POST", inputs: [{name: "String", password: "String", email: "String"}], returns: "User Object"},
            {route: "/login", requires_auth: false, method: "POST", inputs: [{email: "String", password: "String"}], returns: "User Object amd JWT info"},
            {route: "/profile", requires_auth: true, method: "GET", inputs: [{id: "User _ID"}], returns: "Full User Object"},
            {route: "/profile", requires_auth: true, method: "PUT", inputs: ["user object"], returns: "Updated User Object"},
            {route: "/test", requires_auth: false, method: "GET", inputs: [{none: "none"}], returns: "Confirmation that API is up"},
            {route: "/doc", requires_auth: false, method: "GET", inputs: [{none: "none"}], returns: "API Documentation"}
        ]
    }
    res.json(retData)
}


//Exports
module.exports = {
    test,
    register,
    login,
    profile,
    updateProfile,
    doc
}