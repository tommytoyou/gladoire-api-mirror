const db = require('../models')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')



const newCategory = async() =>{
    let newCats = [
        {
            name: "General Discussion",
            description: "General discussion of meditation and the Gladoire App"
        },
        {
            name: "Meditation Enhancers",
            description: "Cacao, Cannabis, and other substances have long been used in meditation.  Discuss your favorite enhancers here"
        },
        {
            name: "Background Music",
            description: "Share your favorite background musio videos here"
        },
        {
            name: "Teachings and Teachers",
            description: "A place for RESPECTFUL discussion about teachings, teachers, and traditions"
        },
        {
            name: "Sacred Space",
            description: "A RESPECTFUL place for the brave to share their deep meditation experiences"
        }
    ]
    const added = await db.Category.insertMany(newCats)
    console.log(added)
}



let adminUser = ""







const addDiscussions = async()=>{
    console.log("Starting to add messages...")
    adminUser = await db.User.findOne({display_name: "Gladoire Admin"})
    console.log(adminUser._id)
    const categories = await db.Category.find({})

    for (let cat of categories){
        if (cat.name === "General Discussion"){
            console.log("General Discussion")
            const newArt = await db.Discussion.create({
                title: "What is YOUR favorite Gladoire feature?",
                author: mongoose.Types.ObjectId(adminUser.id),
                body: "As we move into the second beta phase for Gladoire, we want to hear from you!  What is your favorite Gladoire feature, and what do you really wish it did?",
                category: mongoose.Types.ObjectId(cat.id)
            })
            newArt.comments.push({
                user: mongoose.Types.ObjectId(adminUser.id),
                comment: "What do you think about the Rich Text Editor?  Does it add as much as we hoped?"
            })
            newArt.comments.push({
                user: mongoose.Types.ObjectId(adminUser.id),
                comment: "And what about those custom fields?"
            })
            await newArt.save()

        }
        if (cat.name === "Meditation Enhancers"){
            console.log("Meditation Enhancers")
            const newArt = await db.Discussion.create({
                title: "Review: Sneha Sacred Cacao",
                author: mongoose.Types.ObjectId(adminUser.id),
                body: "At Gladoire, we LOVE Sneha Sacred cacao.  Made by native Guatemayans according to their ancient customs.  Of all the cacaos that we have tried, Sneha is easily our favorite.",
                category: mongoose.Types.ObjectId(cat.id)
            })
            newArt.comments.push({
                user: mongoose.Types.ObjectId(adminUser.id),
                comment: "Keith's is also quite good..."
            })
            await newArt.save()

        }
        if (cat.name === "Background Music"){
            console.log("Background Music")
            const newArt = await db.Discussion.create({
                title: "Calm Whale",
                author: mongoose.Types.ObjectId(adminUser.id),
                body: "We love the music of Calm Whale for meditation..",
                category: mongoose.Types.ObjectId(cat.id)
            })
            newArt.comments.push({
                user: mongoose.Types.ObjectId(adminUser.id),
                comment: "Check him out on YouTube: https://www.youtube.com/channel/UCphOK9NiPE6qnj9Mp9aHWZg"
            })
            await newArt.save()

        }
        if (cat.name === "Teachings and Teachers"){
            console.log("Teachings and Teachers")
            const newArt = await db.Discussion.create({
                title: "Aleister Crowley",
                author: mongoose.Types.ObjectId(adminUser.id),
                body: "What are your thoughts on the controversial founder of Thelema?",
                category: mongoose.Types.ObjectId(cat.id)
            })
            newArt.comments.push({
                user: mongoose.Types.ObjectId(adminUser.id),
                comment: "A progressive man for his time, though often misunderstood because of his outrageous public persona and tendency to bait the press and Establishment"
            })
            await newArt.save()

        }
        if (cat.name === "Sacred Space"){
            console.log("Sacred Space")
            const newArt = await db.Discussion.create({
                title: "The Eye / The Vortex",
                author: mongoose.Types.ObjectId(adminUser.id),
                body: "Many meditators, particularly those who meditate in the dark, experience visions of a Vortex or Eye.  Have you?",
                category: mongoose.Types.ObjectId(cat.id)
            })
            newArt.comments.push({
                user: mongoose.Types.ObjectId(adminUser.id),
                comment: "It's an interesting thing, the harder you focus on it, the less clear it becomes"
            })
            await newArt.save()

        }
    }
}

const theSeed = async()=>{

    console.log("Creating Discussion Categories")
    const cats = await newCategory()
    console.log("Add Discussions and comments")
    const disc = await addDiscussions()
}

theSeed()


/*

 */