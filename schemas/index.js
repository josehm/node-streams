
const DataHandler = require('./schema')

async function createPrize(slug, newPrize) {
  const PrizeModel = DataHandler.create(slug)
  const prize = new PrizeModel(newPrize)
  const savedPrize = await prize.save()
  return savedPrize
}

function PrizeModel(slug) {
  return DataHandler.create(slug)
}

module.exports = {
  createPrize,
  PrizeModel
}