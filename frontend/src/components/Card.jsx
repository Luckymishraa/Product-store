import { useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useProductStore } from '../store/product';
import {toast} from 'react-toastify'
import Modal from './Modal';



const Card = ({product}) => {
    const {deleteProduct} = useProductStore();
    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleDeleteProduct = async ( pid) =>{ 
       const { success } =  await deleteProduct(pid)
          if (!success){
          toast.error("Not able to delete");
        } else {
          toast.success("deleted successfully!");
        }
     }
  return (
    <div className='items-stretch gap-5 bg-gray-500 p-3 rounded-lg shadow-md overflow-hidden '>
    <div className='flex-shrink-0'>
        <img className='w-full h-48 object-cover rounded-lg' src={product.image} alt={product.name}/>
    </div>
    <div className='flex-grow text-xl text-left'>
        <h1 className='pt-2 font-bold'>{product.name}</h1>
        <h1 className='pt-2 font-bold'>{product.price}</h1>
    </div>
    <div className='space-x-3 cursor-pointer'>
       <button  onClick={() => setIsModalOpen(true)} className='bg-sky-400 p-3 rounded-md'> <FaEdit size={25} /> </button> 
       <button onClick={ ()=> handleDeleteProduct(product._id)} className='bg-sky-400 p-3 rounded-md'> <MdDelete size={25} /> </button> 
    </div>

    <Modal isOpen={isModalOpen}
    isClose={() => setIsModalOpen(false)}
    product={product}
     />
    </div>
  )
}

export default Card