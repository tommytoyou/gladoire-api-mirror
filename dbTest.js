const db = require('./models')
const mongoose = require('mongoose')

const separator = "=".repeat(30)
/*
const getDiscussions = async() => {
    let dispData = []
    for (let category of db.Category.find({})) {
        const forum = await db.Discussion.find({category: category._id}).populate('author').populate('category').populate({
            path: "comments",
            populate: {
                path: 'user',
                Model: 'User'

}

*/

const getDiscussions = async() =>{
    let retData = []
    counter = 0
    let categories = await db.Category.find({})
    for (let category of categories){
        const forum = await db.Discussion.find({category: category.id}).populate('author').populate('category').populate({
            path: "comments",
            populate: {
                path: 'user',
                Model: 'User'
            }
        })
        retData.push({category: category.name, posts: []})
        console.log(retData)

        for (let post of forum){
            //console.log(post)
            const postData = {
                title: post.title,
                author: post.author.display_name,
                body: post.body,
                comments: []
            }
            for (let comment of post.comments){
                //console.log(comment)
                const newComment = {
                    date: comment.date,
                    user: comment.user.display_name,
                    comment: comment.comment
                }
                postData.comments.push(newComment)
            }
            retData[counter].posts.push(postData)
        }
        counter += 1



    }
    console.log(retData)
    console.log(separator)
    for (let data of retData){
        console.log(data)
        console.log(data.category)
        for (let pdata of data.posts) {
            console.log(pdata)
            for (let comment of pdata.comments){
                console.log(comment)
            }
        }


    }

}

getDiscussions()

/*
const showDiscussions = async() =>{
    let dispData = []
    const forum = await db.Discussion.find({}).populate('author').populate('category').populate({
        path: "comments",
        populate: {
            path: 'user',
            Model: 'User'
        }
    })
    for (let post of forum){
        console.log(separator)

        for (let comment of post.comments){
            //console.log(`At ${comment.date}, ${comment.user.display_name} said: \n ${comment.comment}`)
            const newComment = {
                date: comment.date,
                user: comment.user.display_name,
                comment: comment.comment
            }
            postData.comments.push(newComment)
        }
        dispData.push(postData)

    }
    return dispData
}

for (let post of showDiscussions()){

}




/*
const addConnectedUser = async()=>{
    let userOne = await db.User.findOne({_id: "6045966785c5889abcbda9b5"})
    let userTwo = await db.User.findOne({_id: "6046a65087b81085844fa830"})
    userOne.connected_users.push(userTwo._id)
    userTwo.connected_users.push(userOne._id)
    userOne.save()
    userTwo.save()
    let updated = await db.User.updateOne({_id: "6045966785c5889abcbda9b5"}, userOne)
    console.log(updated)
    updated = await db.User.updateOne({_id: "6045966785c5889abcbda9b5"}, userOne)
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




const createConversation = async()=>{

    //let userOne = await db.User.findOne({_id: "6045966785c5889abcbda9b5"})
    //let userTwo = await db.User.findOne({_id: "6046a65087b81085844fa830"})
    let convo = await db.Messaging.create({
        users: [mongoose.Types.ObjectId("6045966785c5889abcbda9b5"), mongoose.Types.ObjectId("6046a65087b81085844fa830")]
    })
    let message = {
        sender: mongoose.Types.ObjectId("6046a65087b81085844fa830"),
        subject: "We Await Your Orders",
        message: "All is in readiness, Master...we merely await Your Word"
    }
    convo.messages.push(message)
    await convo.save()
    //updated = await db.Messaging.updateOne({_id: convo._id}, convo)
    convo = await db.Messaging.findOne({_id: convo.id}).populate('users').populate({
        path: "messages",
        populate: {
            path: 'sender',
            Model: 'User'
    }})
    console.log(`Users: ${convo.users}`)
    console.log("Messages: ")
    convo.messages.forEach((msg) =>{
        console.log("++++++++++++++++++++++++++")
        console.log(msg.sender.display_name)
        console.log(msg.subject)
        console.log(msg.message)
        console.log("++++++++++++++++++++++++++")
    })

}

createConversation()



const addMessage = async() =>{
    let newMessage = {
        sender: mongoose.Types.ObjectId("6046a65087b81085844fa830"),
        subject: "By your command...",
        message: "We shall be ready!"
    }

    //let convo = await db.Messaging.findOne({_id: "6046bf9182492a8b3c68127c"})
    //convo.messages.push(newMessage)
    //convo.save()
    //updated = await db.Messaging.updateOne({_id: convo._id}, convo)

    let convo = await db.Messaging.findOne({_id: "6046bf9182492a8b3c68127c"}).populate('users').populate({
        path: "messages",
        populate: {
            path: 'sender',
            Model: 'User'
        }})

    let userList = []
    convo.users.forEach(user =>{
        userList.push(user.display_name)
    })

    console.log("Users in conversation:")
    userList.join(', ')
    convo.messages.forEach(msg =>{
        console.log("++++++++++++++++++++++++++")
        console.log(`Date: ${msg.date}`)
        console.log(`From: ${msg.sender.display_name}`)
        console.log(`Recipients: ${userList.join(', ')}`)
        console.log(`Subject: ${msg.subject}`)
        console.log(`Message: ${msg.message}`)
        console.log("++++++++++++++++++++++++++")
    })
}

addMessage()

*/