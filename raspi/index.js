const mosca = require('mosca')

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
 
server.on('clientConnected', (client) => {
    console.log('client connected', client.id)
})
 
// fired when a message is received
server.on('published', (packet, client) => {
  console.log('Published from the RPi broker: ', packet.payload)
})
 
server.on('ready', setup)
 
// fired when the mqtt server is ready
function setup() {
  console.log('Mosca server is up and running')
}