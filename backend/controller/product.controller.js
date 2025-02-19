import Product from "../models/products.model.js";
import mongoose from 'mongoose'

export const getProducts =  async (req,res) =>{
    try{
        const  products =  await Product.find({})
        res.status(201).json({success:true, data: products})

    } catch(error){
        console.log("Error fetching products...", error.message);
        res.status(500).json({success:false, message:"Server Error!"})

    }
}

export const createProduct = async (req, res) =>{
    const product = req.body; //user will send this data

    if (!product.name || !product.price || !product.image ){
        res.status(400).json({success:false, message:"Please provide all the fields!"})
    }
    const newProduct = new Product(product) 
    
    try{
       
        await newProduct.save(); //save to the database
        res.status(201).json({success:true, data:newProduct});

    } catch (error){
        console.log("Error in create product:", error.message);
        res.status(500).json({success:false, message:"Internal Server error"})

    }

}

export const updateProduct =  async (req, res) =>{
    const {id} = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({success:false, message:"Product not found by this Id"})
    }

    try{
        const updateProduct = await Product.findByIdAndUpdate(id, product, {new:true})
        res.status(200).json({success:true, data:updateProduct})

    } catch (error){
       console.log("Error in updating Product:", error.message)
       res.status(500).json({success:false, message:"Server Error"})
    }
}

export const deleteProduct = async (req, res) =>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({success:false, message:"Product Not Found"})
    }
   try{
       await Product.findByIdAndDelete(id);
       res.status(200).json({success: true, message:"Product Deleted Scuucessfully!!"})
   } catch(error){
    console.log("Error delete product: ", error.message)
    res.status(500).json({success: false, message:"Oops!! Server Error"})

   }

}