const express = require('express');
const app = express();
const https = require('https')

app.get('/',(req,res)=>{
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=Deoghar&appid=16de24b4888f3340b945750ae1eeffdd&units=metric'
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
           res.write('<h1>Temp in Deoghar is '+ temp + ' degress Celcius.</h1>')
           res.write('<p>The weather is currently '+ description +'</p>')
           res.write('<img src='+imgURL+'>')
           res.send()
        })
    })

})










app.listen(3000,()=>{
    console.log('Server running at 3000');
})