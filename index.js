const mongoose = require('mongoose')
const { pipeline } = require('stream')
const JSONStream      = require('JSONStream')
const fs = require('fs')

const { PrizeModel, createPrize } = require('./schemas')
const { streamToMongo } = require('./importData')


mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://localhost/premios', {
  useNewUrlParser: true,
})
.then(async () => {
  console.log('Connected')
  const prize = PrizeModel('unmodel')
  const fileStream = fs.createReadStream('./data.json')
  pipeline(
    fileStream,
    JSONStream.parse('*'),
    streamToMongo(prize, 3),
    (err) => {
      if (err) console.error('Pipeline failed', err)
      else console.log('Pipeline succeeded')
    }
  )
})
.catch((e) => {
  console.log('Error: ', e)
})

  
  /*
  var db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', function() {
    console.log('Conectado !!')
  })

var kittySchema = new mongoose.Schema({
  name: String
})
var Kitten = mongoose.model('Kitten', kittySchema)
var silence = new Kitten({ name: 'Silence' })
console.log(silence.name)
*/