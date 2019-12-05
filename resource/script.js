var defa = ["meter/sec", "Kelvin"];
var metric = ["meter/sec", "Celcius"];
var imperial = ["miles/hour", "Fahrenheit"];
$(document).ready(function() {
    $("#weather").click(function() {
        var city = $("#city").val();
        var radioValue = $("input[name='unit']:checked").val();

        if (city != "") {
            $.ajax({
                url:
                    "http://api.openweathermap.org/data/2.5/weather?q=" +
                    city +
                    "&units=" +
                    radioValue +
                    "&APPID=784970cd25d49bd7c2e4f9c019631272",
                type: "GET",
                dataType: "jsonp",
                statusCode: {
                    404: function() {
                        $("#city").val("");
                        alert("City Not Found.");
                    },
                    500: function() {
                        $("#city").val("");
                        alert("Error: 500: Server error occurred.");
                    }
                },
                success: function(data) {
                    if (radioValue == "default") {
                        var widget = show(data, defa);
                    } else if (radioValue == "metric") {
                        var widget = show(data, metric);
                    } else if (radioValue == "imperial") {
                        var widget = show(data, imperial);
                    }

                    $("#result").html(widget);
                    $("#city").val("");
                }
            });
        } else {
            alert("areeee");
        }
    });
});

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
