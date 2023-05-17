import mongoose from "mongoose";
const cartsCollection = 'carts'

const cartSchema = mongoose.Schema(
  {
    products: Array,
  }
)

export const cartModel = mongoose.model(cartsCollection,cartSchema)