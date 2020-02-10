const { Writable } = require('stream')

const streamToMongo = (model, batchSize) => {
  
  let records = []
  // this function is usefull to insert records and reset the records array
  const insert = async () => {
    console.log('hola: ', records.length, '-->', batchSize )
    await model.create(records)
    records = []
  }
  // stream
  const writable = new Writable({
    objectMode: true,
    write: async (record, encoding, next) => {
      try {
        // add to batch records
        records.push(record)
        // insert and reset batch recors
        if (records.length >= batchSize) await insert()
        // next stream
        next()
      } catch (error) {
        writable.emit('error', error);
      }
    }
  })

  writable.on('finish', async () => {
    try {
      if (records.length > 0) await insert()
      writable.emit('close')
    } catch(error) {
      writable.emit('error', error)
    }
  })

  return writable
}

module.exports = {
  streamToMongo
}