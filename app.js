const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.sendFile(__dirname +'/index.html' )

})

app.post('/',(req,res)=>{
    const query = req.body.cityName
    const apiKey = 'YOUR_API_KEY'
    const unit = 'metric'
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+query+'&appid='+apiKey+'&units='+unit
    https.get(url,(response)=>{
        console.log(response.statusCode);

        response.on('data',function(data){
           const weatherData = JSON.parse(data)
           const temp = weatherData.main.temp
           const description = weatherData.weather[0].description
           console.log(temp)
           console.log(description);
           const icon = weatherData.weather[0].icon
           const imgURL = 'http://openweathermap.org/img/wn/'+icon+'@2x.png'
           res.write('<h1>Temp in '+query+' is '+ temp + ' degress Celcius.</h1>')
           res.write('<p>The weather is currently '+ description +'</p>')
           res.write('<img src='+imgURL+'>')
           res.send()
        })
    })

})












app.listen(3000,()=>{
    console.log('Server running at 3000');
})
