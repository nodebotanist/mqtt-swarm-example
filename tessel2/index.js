const mqtt = require('mqtt')

let mqttRPiClient = mqtt.connect('mqtt://192.168.1.107', {
  port: 1883,
  clientId: 'nodebotanist-tessel2-ace'
})

mqttRPiClient.on('connect', () => {
  console.log('connected to Pi!')
  mqttRPiClient.subscribe('tessel-message')
})

mqttRPiClient.on('error', (err) => {
  console.log('error connecting to the Pi: ', err)
})

mqttRPiClient.on('message', (topic, message) => {
  console.log(topic, message.toString())
})