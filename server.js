const express = require('express')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000
const ip = require('ip')

let userIp = ip.address()

hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine', 'hbs')

app.get('/', (req, res)=>{
    res.render('index.hbs', {
        pageTitle: 'Main page',
        pageName: 'home page',
        ipAddress: userIp
    })
})

app.get('/info', (req, res)=>{
    res.render('info.hbs', {
        pageTitle: 'Info page',
        pageName: 'info page'
    })
})
app.listen(port, ()=>{
    console.log(`App running on ${port}`)
})