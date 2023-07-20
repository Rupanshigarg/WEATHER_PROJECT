
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

    res.sendFile(__dirname+"/index.html");    
})

app.post("/", function(req, res){
    var city = req.body.city;
    console.log("Request recieved "+city);


    var query = city;
    var apiKey = "6d3d13c037ae74ad6caa4d97b34eb4f2";
    units="metric";

    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+units;
    https.get(url, function(response){
        // console.log(response);
        console.log(response.statusCode+' '+response.statusMessage);

        response.on('data', function(data){

            var d = JSON.parse(data);
            console.log(d);

            var s = JSON.stringify(d);

            var temperature = d.main.temp;

            var wDescription = d.weather[0].description;

            var icon=d.weather[0].icon;
            
            var iconUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
            console.log(iconUrl);

            res.setHeader("Content-Type", "text/html");

            res.write("<h3>Weather in "+query+" is "+wDescription+" </h3>");
            res.write("<h1>Temperature of "+ query +" is: "+temperature+" degree celcius</h1>");
            res.write("<img src = "+iconUrl+"></img>");
            res.send();
        })
    })
})



app.listen(2000, function(){
    console.log("Server Started");
})