
//const location1 =alert();
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
//const loc = document.querySelector('#location');
//var name = window.prompt("Enter your name: ");
app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
})
app.post("/" , function(req ,res){
  const location = req.body.cityName
  const apiKey = "fc66f865907f1ab5b6442506a908a7f0"
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + location +"&appid="+apiKey+"&units=" +unit
  https.get(url , function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
    const wetherData = JSON.parse(data);
      const temp = wetherData.main.temp
      const wetherDescription = wetherData.weather[0].description
      const icon = wetherData.weather[0].icon
      const imageUrl = "https://openweathermap.org/img/wn/"+ icon +"@2x.png"
      res.write("<p>The wether is currently"+" " +wetherDescription +"</p>");
      res.write("<h1>The temperature in "+location+" is"+" " + temp +" "+ "degrees celcieus.</h1>")
      res.write("<img src=" + imageUrl +">");
      res.send();
    })
  })
})










app.listen(3000, function(){
  console.log("Server is running on port 3000.");
})
