import { Router } from 'express'
import { ProductManager } from '../Dao/managers/fileSystem/ProductManager.js'

const pm = new ProductManager()

const router = Router()

router.get('/', (req, res) => {
  res.render('index', { title: 'main' })
})

router.get('/home', (req, res) => {
  const products = pm.getProducts()
  res.render('home', { prod: products })
})

router.get('/realTimeProducts', (req, res) => {
  const products = pm.getProducts()
  const io = req.app.get('socketio')
  io.on('connection', (socket) => {
    socket.emit('evento_server', 'te manda saludos el server')
  })
  res.render('realTimeProducts', { prod: products })
})

router.get('/chat',(req, res) => {
  res.render('chat')
})

export default router
