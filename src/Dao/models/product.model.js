import mongoose from "mongoose";
const productsCollection = 'products'

const productSchema = mongoose.Schema(
  {
    title : String,
    description: String,
    price: Number,
    thumbnail: Array,
    code:String,
    stock:Number,
    status:Boolean,
    category:String
  }
)

export const productModel = mongoose.model(productsCollection,productSchema)