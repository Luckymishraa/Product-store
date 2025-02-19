import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/product'
import Card from '../components/Card'

const HomePage = () => {
const { fetchProducts, products } = useProductStore();


useEffect(() =>{
  fetchProducts();
},[fetchProducts])



  return (
    <div className='mt-9'>
      <div className=''>
         <h1 className='text-4xl font-bold text-blue-800  text-center'>Current Products</h1>
      </div>
          {/* grid layout for cards */}
          <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4 bg-gray-100'>
          {products.map((product) =>(
            <Card key={product._id} product={product}/>
          ))}

          </div>
            {products.length === 0 && (
                  <div className='flex'>
              <p className='text-xl text-center font-bold text-gray-900'> No product found 😢</p>
              <Link to={"/create"} className='text-xl text-center font-bold text-sky-700 hover:underline'> Create a product</Link>
                  </div>
            )}
    </div>
  )
}

export default HomePage