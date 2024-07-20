const express = require('express')
const app = express()
const path = require('path')
const userModel = require('./models/users')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, "public")))

app.get('/', (req, res)=>{
    res.render('index')
})

app.post('/create', async(req, res)=>{
    let {name,email, image} = req.body
    const createdUser = await userModel.create({
        name,
        email,
        image,
    })
    res.redirect('/read')
})


app.get('/read', async(req, res)=>{
    const allUsers = await userModel.find()
    res.render('read',{allUsers})
})

app.get('/delete/:id', async(req, res)=>{
    let {id} = req.params
    const deletedUser = await userModel.findOneAndDelete({_id: id})
    res.redirect('/read')
})


app.get('/edit/:id', async(req, res)=>{
    let {id} = req.params
    const editedUser = await userModel.findOne({_id: id})
    res.render('edit', {editedUser})
})

app.post('/update/:id', async(req, res)=>{
    let {name, email, image} = req.body
    let {id} = req.params
    const editedUser = await userModel.findOneAndUpdate({_id: id}, {name, email, image}, {new: true})
    res.redirect('/read')
})


app.listen(8080)