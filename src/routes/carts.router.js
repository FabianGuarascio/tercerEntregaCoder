import { Router } from 'express'
import { ProductManager } from '../Dao/managers/fileSystem/ProductManager.js'
import { ChartManager } from '../Dao/managers/fileSystem/ChartManager.js'
import { MongoCartManager } from '../Dao/managers/mongo/mongoCartManager.js'
import { MongoProductManager } from '../Dao/managers/mongo/mongoProductManager.js'

const pm = new ProductManager()
const cm = new ChartManager()
const mongoCm = new MongoCartManager()
const mongoPm = new MongoProductManager()
const router = Router()

router.get('/', async (req, res) => {
  const charts = await mongoCm.getCarts()
  res.send(charts)
})

router.post('/', async (req, res) => {
  const { body } = req
  const cartAdded = await mongoCm.addCart(body)
  res.send(cartAdded)
})

router.get('/:cid', async (req, res) => {
  const { cid } = req.params
  const chart = mongoCm.getCartById(cid)
  if (chart) {
    res.send(chart)
  } else {
    res.status(404).send('Carrito con ese id no existe')
  }
})

export default router
