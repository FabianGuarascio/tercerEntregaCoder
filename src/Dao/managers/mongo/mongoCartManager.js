import { cartModel } from "../../models/cart.model.js"


export class MongoCartManager {
  async getcarts() {
    const carts = await cartModel.find()
    return carts
  }

  async getcart(id){
    try {
      return await cartModel.findById(id)
    }catch(error){
      return error
    }
  }

  async addcart(cart) {
    return await cartModel.create(cart)
  }

  async updatecart(id,cart) {
    return await cartModel.updateOne( {_id:id} ,cart)
  }
  async deletecart(id){
    return await cartModel.deleteOne( {_id:id})
  }
}
