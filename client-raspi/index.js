const JVSDisplayOTron = require('jvsdisplayotron')
const mqtt = require('mqtt')

let displayHat = new JVSDisplayOTron.DOTHAT()

let mqttPiClient = mqtt.connect('mqtt://nodebotanist-pi-ace.local',{
  clientId: 'nodebotanist-pi-arya',
  port: 1883
})

displayHat.lcd.setContrast(45)
displayHat.lcd.write('Hello, Twitch!')

mqttPiClient.on('connect', () => {
  console.log('Connected to RPi broker!')
  mqttPiClient.subscribe('general')
})

mqttPiClient.on('message', (topic, message) => {
  displayHat.lcd.clear()
  displayHat.lcd.write('got the message')
})

mqttPiClient.on('error', (err) => {
  console.log('Error connecting to RPi broker: ', err)
})