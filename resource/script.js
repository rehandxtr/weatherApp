var defa = ["meter/sec", "Kelvin"];
var metric = ["meter/sec", "Celcius"];
var imperial = ["miles/hour", "Fahrenheit"];
function getData(){
    
    var city = document.getElementById('city').value;
    var radioValue = document.getElementById("unit").value;
 var url="https://api.openweathermap.org/data/2.5/weather?q=" + city +"&units=" +radioValue +"&APPID=784970cd25d49bd7c2e4f9c019631272";
    fetch(url).then(result=>result.json()).then((data)=>{
       try{
           if (radioValue == "default") {
                        var widget = show(data, defa);
                    } else if (radioValue == "metric") {
                        var widget = show(data, metric);
                    } else if (radioValue == "imperial") {
                        var widget = show(data, imperial);
                    }
        document.getElementById("result").innerHTML=widget;
        document.getElementById("city").innerHTML="";
       }
        catch{
    alert("NOt Found");
    }
    })
    
    
    
}


function show(data, unit) {
    return (
        "<h1>Weather of " +
        data.name +
        "</h1>" +
        "<h3><strong>Description : </strong>" +
        data.weather[0].description +
        "</h3>" +
        "<img src=http://openweathermap.org/img/w/" +
        data.weather[0].icon +
        ".png" +
        " alt=" +
        ">" +
        "<h3><strong>Wind Speed : </strong>" +
        data.wind.speed +
        " " +
        unit[0] +
        "</h3>" +
        "<h3><strong>Temprature : </strong>" +
        data.main.temp +
        " " +
        unit[1] +
        "</h3>" +
        "<h3><strong>Minimum Temprature :</strong>" +
        data.main.temp_min +
        " " +
        unit[1] +
        "</h3>" +
        "<h3><strong>Maximum Temprature : </strong>" +
        data.main.temp_max +
        " " +
        unit[1] +
        "</h3>"
    );
}
