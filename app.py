from flask import Flask, request
import requests
app = Flask(__name__)
@app.route('/',methods=['GET'])
def display_weather():
    try:
        station = request.args['station']
    except KeyError:
        station = "MARSEILLE"
    print(station)
    data= requests.get('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,precipitation,wind_speed_10m&models=meteofrance_seamless').json()
    print(data)



    return  f"""
    <input placeholder="Station"></input>
    <button>soumettre</button>
    <h1> Météo à Marseille </h1>
   
                <p>Température : {data["hourly"]["temperature_2m"][0]}°C</p>
                <p>Vitesse du vent : {data["hourly"]["wind_speed_10m"][0]} km/h</p>
                <p>Precipitation :{data["hourly"]["precipitation"][0]} mm</p>
    """


app.run()