const db = require('./models')
const mongoose = require('mongoose')




/*
const addConnectedUser = async()=>{
    let userOne = await db.User.findOne({_id: "6045966785c5889abcbda9b5"})
    let userTwo = await db.User.findOne({_id: "6046a65087b81085844fa830"})
    userOne.connected_users.push(userTwo._id)
    userTwo.connected_users.push(userOne._id)
    userOne.save()
    userTwo.save()
    let updated = await db.User.updateOne({_id: "6045966785c5889abcbda9b5"}. userOne)
    console.log(updated)
    updated = await db.User.updateOne({_id: "6045966785c5889abcbda9b5"}. userOne)
    console.log(updated)
    let uOne = await db.User.findOne({_id: "6045966785c5889abcbda9b5"}).populate('connected_users')
    console.log(uOne)
}
addConnectedUser()




const addjournal = async()=>{
    let newEntry = {
        duration: 30,
        bg_music: "https://www.youtube.com/watch?v=1R9rpyZ_RzQ&t=931s",
        user: mongoose.Types.ObjectId("6045966785c5889abcbda9b5"),
        moon_phase: "No moon in the daytime!",
        notes: "We sat together, the mountain and I until only the mountain remained",
        user_fields: [
            {cannabis: "Chocolate Hashberry"},
            {cacao: "Sneha"},
            {direction: "South"},
            {vortex: "no"},
            {eye: "no"}
        ],
        mood_pre: 2,
        mood_post: 4,
        energy_pre: 2,
        energy_post: 2,
        tags: ["demo", "test", "sample"],
        location: "home/indoors"

    }
    const item = await db.Journal.create(newEntry)
    await item.save()
    console.log("Created Entry:")
    console.log(item)
}

addjournal()





const getJournal = async() =>{
    //60469f78b996ef6ce4760f49
    let entry = await db.Journal.findOne({_id: "60469f78b996ef6ce4760f49"}).populate('user')
    console.log(entry)
}

getJournal()





const postDiscussion = async()=>{
    let newArticle = {
        title: "Test Post",
        author: mongoose.Types.ObjectId("6045966785c5889abcbda9b5"),
        category: mongoose.Types.ObjectId("604697861dc57d9b742001b2"),
        body: "This is the first post on Gladoire, and nobody will ever see it because it is only a test..."
    }
    const newItem = await db.Discussion.create(newArticle)
    console.log(newItem)
}

postDiscussion()







const getDiscussion = async()=>{
    let article = await db.Discussion.findOne({_id: "6046a15ef963ec9c5c6fa5a5"}).populate('author').populate('category')
    console.log(article)
}

//getDiscussion()




const addComment = async()=>{
    let thePost = await db.Discussion.findOne({_id: "6046a15ef963ec9c5c6fa5a5"})
    //console.log(thePost)
    thePost.comments.push({
        user: mongoose.Types.ObjectId("6045966785c5889abcbda9b5"),
        comment: "I shall weep on the day it goes to the bin"
    })
    thePost.save()
    const updated = await db.Discussion.updateOne({_id: "6046a15ef963ec9c5c6fa5a5"}, thePost, {new: true})
    //console.log(updated)
    //thePost = await db.Discussion.findOne({_id: "6046a15ef963ec9c5c6fa5a5"}).populate('Category').populate('comment.user').populate('author').populate('category')
    thePost = await db.Discussion.findOne({_id: "6046a15ef963ec9c5c6fa5a5"}).populate('author').populate({
        path: "comments",
        populate: {
            path: 'user',
            Model: 'User'
        }
    })
    thePost.comments.forEach(comment =>{
        console.log(comment.user.display_name)
    })





    //console.log(thePost)
}

addComment()



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
        }
        ]
    const added = await db.Category.insertMany(newCats)
    console.log(added)
}

newCategory()


*/

const createConversation = async()=>{
    let newConvo = {

    }
}