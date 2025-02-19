import { useEffect, useState} from 'react'
import { useProductStore } from '../store/product';
// import { name } from 'ejs';

const Modal = ({isOpen, isClose, product}) => {
    const { updateProduct } = useProductStore();
   
    const [updatedProduct, setUpdatedProduct] = useState(product || {name:"", price:"", image:""});

    useEffect(()=>{
        if(product){
            setUpdatedProduct(product)
        }
    },[product])

    if (!isOpen){
        return null;
    }

    
 
// function to handle update
const handleUpdatedProduct = async(e) => {
    e.preventDefault();
    await updateProduct(product._id, updatedProduct);
    isClose();
}


  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
        <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
            <h1 className='text-2xl font-bold mb-4'>Update Product</h1>
            <form className='space-y-4' onSubmit={handleUpdatedProduct}>
                <div>
                    <input 
                        placeholder='Name'
                        name='name'
                        value={updatedProduct.name}
                        className='border p-2 w-full focus:outline-none'
                        onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value})}
                    />
                </div>
                <div>
                <input 
                        placeholder='price'
                        name='price'
                        value={updatedProduct.price}
                        className='border p-2 w-full focus:outline-none'
                        onChange={(e) => setUpdatedProduct({...updatedProduct, price: e.target.value})}
                    />
                </div>
                <div>
                    <input
                        placeholder='image URL'
                        name='image'
                        value={updatedProduct.image}
                        className='border p-2 w-full focus:outline- none'
                        onChange={(e) => setUpdatedProduct({...updatedProduct, image: e.target.value})}

                    />
                </div>
                {/* <button type='submit' onClick={() => handleUpdatedProduct(FaProductHunt._id, updatedProduct)}>Update</button> */}
              <div className='space-x-3'>
                <button type='submit' className='bg-gray-400 p-2 rounded shadow-md'> Update</button>
                <button type='submit' className='bg-gray-400 p-2 rounded shadow-md' onClick={isClose}>Cancel</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Modal