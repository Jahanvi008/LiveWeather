const express = require("express");
const app = express();

const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html" );
})

app.post("/", function(req, res){
    
    const query = req.body.cityName;
    const apiKey = "9253c71cc07e208e070f0759d3f5b03f";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query + "&units="+ unit+"&appid="+apiKey+"";
    
    https.get(url, function(response){
        response.on("data", function(data){
            const weatherdata = JSON.parse(data);

            const weatherDescription = weatherdata.weather[0].description;

            const temp = weatherdata.main.temp;
            const temp_feels_like = weatherdata.main.feels_like;
            const min_temp = weatherdata.main.temp_min;
            const max_temp = weatherdata.main.temp_max;
            const pressure = weatherdata.main.pressure;
            const humidity = weatherdata.main.humidity;

            const icon = weatherdata.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
            
            const latitude = weatherdata.coord.lat;
            const longitude = weatherdata.coord.lon;

            const wind_speed = weatherdata.wind.speed;
            const weatherInfo = {
                description: weatherDescription,
                temperature: temp,
                temp_feels_like: temp_feels_like,
                min_temp: min_temp,
                max_temp: max_temp,
                pressure: pressure,
                humidity: humidity,
                image: imageURL,
                latitude: latitude,
                longitude: longitude,
                wind_speed: wind_speed,
            };
            //sending response as JSON to HTML
            const weatherInfoJSON = JSON.stringify(weatherInfo);
            res.json(weatherInfoJSON);

        });
    });
});

app.listen(3000, function(){
    console.log("The server is running on port 3000");
})