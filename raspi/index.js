const mosca = require('mosca')
const mqtt = require('mqtt')
const dotenv = require('dotenv').config()

var mqttBackend = {
  //using mongoDB
  type: 'mongo',
  url: 'mongodb://localhost:27017/mqtt',
  pubsubCollection: 'mqtt-example',
  mongo: {}
}
 
var settings = {
  port: 1883,
  backend: mqttBackend
}
 
var server = new mosca.Server(settings)

var adafruitIOClient = mqtt.connect('mqtt://io.adafruit.com', {
  username: process.env.ADAFRUIT_IO_USERNAME,
  password: process.env.ADAFRUIT_AIO_KEY,
  port: 1883
})
 
server.on('clientConnected', (client) => {
    console.log('client connected', client.id)
})
 
// fired when a message is received
server.on('published', (packet, client) => {
  console.log('Published from the RPi broker: ', packet.payload)
})
 
server.on('ready', setup)

adafruitIOClient.on('connect', () => {
  console.log('connected to AdafruitIO!')
  adafruitIOClient.subscribe('nodebotanist/feeds/mqtt-example.raspi-broker')
  adafruitIOClient.subscribe('nodebotanist/feeds/mqtt-example.tessel2-client')
})

adafruitIOClient.on('error', (err) => {
  console.log('Error connecting to AdafruitIO', err)
})

adafruitIOClient.on('message', (topic, message) => {
  console.log('Message Recieved:', topic, message)
  if(topic == 'nodebotanist/feeds/mqtt-example.tessel2-client') {
    server.publish({
      topic:'tessel-message',
      payload: message
    })
  }
})
 
// fired when the mqtt server is ready
function setup() {
  console.log('Mosca server is up and running')
}