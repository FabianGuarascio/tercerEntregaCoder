import { Router } from 'express'
import { ProductManager } from '../Dao/managers/fileSystem/ProductManager.js'
import { MongoProductManager } from '../Dao/managers/mongo/mongoProductManager.js'

const router = Router()
const pm = new ProductManager()
const mongoPm = new MongoProductManager()


router.get('/', async (req, res) => {
  const products = await mongoPm.getProducts()
  return res.status(200).send(products)
})

router.get('/:pid', async (req, res) => {
  const pid = req.params.pid
  const io = req.app.get('socketio')
  const product = await mongoPm.getProduct(pid)
  io.sockets.emit('get_p_id', product)
  res.status(200).send(product)
})

router.post('/', async (req, res) => {
  const { title , description, price, thumbnail, code, stock, status, category} = req.body
  if(!title || !description || !price || !code || !stock || !category){
    return res.status(405).send("el producto que se esta enviando no esta completo")
  }
  const product = req.body
  const addedProduct = await mongoPm.addProduct(product)
  return res.status(200).send(addedProduct)
})

router.put('/:pid', async (req, res) => {
  const pid = req.params.pid
  const product = req.body
  const updateProduct = await mongoPm.updateProduct(pid,product)
  return res.status(200).send(updateProduct)
})

router.delete('/:pid', async (req, res) => {
  const pid = req.params.pid
  const io = req.app.get('socketio')
  try {
    const deletedProduct = await mongoPm.deleteProduct(pid)
    io.sockets.emit('delete_product', pid)
    return res.status(200).send(`Producto con id ${pid} borrado con exito`)
  }catch(error){
    return res.status(500).send(error)
  }
})

export default router
