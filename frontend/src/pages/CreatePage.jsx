import {useState} from 'react'
import { useProductStore } from '../store/product.js';


const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name:  "",
    price: "",
    image: "",
  });

 const {createProduct} = useProductStore()

  const handleAddProduct = async (e) =>{
    e.preventDefault()

    const { success, message } = await createProduct(newProduct);
    console.log("success:", success);
    console.log("message", message);
    // console.log(createProduct)

    setNewProduct({name:"", price:"",image:""});
   
  }
  return ( 
    <div className='flex justify-center align-center mt-9'>
    <div className='w-full max-w-md bg-white shadow-xl rounded-lg p-6'>
      <h1 className='text-3xl font-bold text-center text-gray-800 mb-6'>Create New product </h1>
       

    <form className='space-y-4' onSubmit={handleAddProduct}>
      <input  placeholder='Product Name'
        name='name'
        value={newProduct.name}
        className='w-full p-3 border border-gray-300 rounded-lg focus:-ring-2 focus:ring-sky-400 focus:outline-none'
        onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
      />
      <input placeholder='Price'
      name='price'
      value={newProduct.price}
      className='w-full p-3 border border-gray-300 rounded-lg focus:-ring-2 focus:ring-sky-400 focus:outline-none'
      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} />
      <input placeholder='image URL'
       name='image'
       value={newProduct.image}
       className='w-full p-3 border border-gray-300 rounded-lg focus:-ring-2 focus:ring-sky-400 focus:outline-none'

       onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
      />
      <button onClick={handleAddProduct} type='submit' className="w-full bg-slate-500 hover:bg-sky-600 text-white font-semibold p-3 rounded-lg transition-all duration-200"
>
        Add Product
      </button>
    </form>
    </div>
    </div>
  )
}

export default CreatePage