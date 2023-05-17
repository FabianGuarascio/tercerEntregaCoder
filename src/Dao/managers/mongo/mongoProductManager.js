import { productModel } from '../../models/product.model.js'

export class MongoProductManager {
  async getProducts() {
    const products = await productModel.find()
    return products
  }

  async getProduct(id){
    try {
      return await productModel.findById(id)
    }catch(error){
      return error
    }
  }

  async addProduct(product) {
    return await productModel.create(product)
  }

  async updateProduct(id,product) {
    return await productModel.updateOne( {_id:id} ,product)
  }
  async deleteProduct(id){
    return await productModel.deleteOne( {_id:id})
  }
}
