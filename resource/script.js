var defa = ["meter/sec", "Kelvin"];
var metric = ["meter/sec", "Celcius"];
var imperial = ["miles/hour", "Fahrenheit"];
function getData() {
    var city = document.getElementById("city").value;
    var unitValue = document.getElementsByName("unit");
    var checkValue = "";
    for (var i = 0, length = unitValue.length; i < length; i++) {
        if (unitValue[i].checked) {
            checkValue = unitValue[i].value;
            break;
        }
    }
    var url =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=" +
        checkValue +
        "&APPID=784970cd25d49bd7c2e4f9c019631272";
    fetch(url)
        .then(result => result.json())
        .then(data => {
            try {
                if (checkValue === "default") {
                    var widget = show(data, defa);
                } else if (checkValue === "metric") {
                    var widget = show(data, metric);
                } else if (checkValue === "imperial") {
                    var widget = show(data, imperial);
                }
                document.getElementById("result").innerHTML = widget;
                document.getElementById("city").value = "";
            } catch {
                alert("City Not Found");
                document.getElementById("city").value = "";
            }
        });
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
