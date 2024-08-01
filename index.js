const { log } = require('console');
const { render } = require('ejs');
const express = require('express');
const app = express()
const path = require("path");
const { v4: uuidv4 } = require('uuid');
// uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
// const methodOverride = require('method-override')
var methodOverride = require('method-override')

const port = 8080;

app.use(express.urlencoded({extended:true}))
// app.use(methodOverride("_method"))
app.use(methodOverride('_method'))

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))


app.use(express.static(path.join(__dirname, 'public')))


let posts = [
    {
        id: uuidv4(),
        username: "nasirkhan",
        content : "I love coding"
    },
    {
        id: uuidv4(),
        username: "khan",
        content : "Hard worker"
    },
    {
        id: uuidv4(),
        username: "nawab",
        content : "I got selected for internship"
    },
    
]


//====> '/' route
app.get('/', (req, res) =>{
    res.send('servering working well')
})

//=====> '/posts route'
app.get('/posts', (req, res) =>{
    // res.send('servering working well')
    res.render('index.ejs', {posts});
})

app.get('/posts/new', (req, res)=>{
    res.render("new.ejs")
})

app.post('/posts', (req, res) => {
    // console.log(req.body);
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    // res.send('Post requests working')
    res.redirect('/posts')
})

app.get('/posts/:id', (req, res)=>{
    let {id} = req.params;
    // console.log(id);
    let post = posts.find((p)=> id === p.id)
    // console.log(post);
    // res.send('request working')
    res.render('show.ejs', {post})
})

app.patch('/posts/:id', (req, res)=>{
    let {id} = req.params;
    // console.log(id);
    let newContent = req.body.content;
    let post = posts.find((p)=> id === p.id)
    post.content = newContent;
    console.log(post);

    // res.send('Patch rerquest working')
    res.redirect('/posts')
})


app.get('/posts/:id/edit', (req, res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id)
    res.render('edit.ejs', post);
    // console.log(post);
    // console.log(posts);
})

app.delete('/posts/:id', (req, res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=> id !== p.id);
    // res.send('Delete Success');
    res.redirect('/posts')
})


app.listen(port, ()=>{
    console.log(`app listening on port localhost:${port}`);
})

//===> day 34 >> Distroy(Delete) route : 3:00