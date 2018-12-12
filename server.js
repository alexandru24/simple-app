const express = require('express')
const hbs = require('hbs')
const app = express()
const axios = require('axios')
const port = process.env.PORT || 3000


hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine', 'hbs')
let userLocation
let userTemperature
axios.get('https://jsonip.com/').then((response)=>{
    let userIp = response.data.ip
    let ipLookUp = `http://api.ipstack.com/${userIp}?access_key=9ef734509a141da137a63fe0404f122a`
    return axios.get(ipLookUp)
}).then((response)=>{
    userLocation = response.data.city
    let lat = response.data.latitude
    let long = response.data.longitude
    let weatherURL = `https://api.darksky.net/forecast/dadbe7d3d59ffb44a9ce0a9563c17f35/${lat},${long}`
    return axios.get(weatherURL)
}).then((response)=>{
    let tempFahrenheit = response.data.currently.temperature
    userTemperature = (tempFahrenheit - 32) * 5/9
})

app.get('/', (req, res)=>{
    res.render('index.hbs', {
        pageTitle: 'Main page',
        pageName: 'home page',
        userLocation: userLocation,
        userTemperature: userTemperature.toFixed(0)
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