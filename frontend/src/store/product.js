import {create} from "zustand";
import { toast } from 'react-toastify'


// creatin a global state
export const useProductStore = create((set) =>(
    {
        products: [], //initialize with empty error
        setProducts : (products) => set({ products }),

        // function to create product
        createProduct: async (newProduct) =>{
            if(!newProduct.name || !newProduct.price || !newProduct.image){
               toast("Please fill in all fields.")
            }
            try{
                const res = await fetch("http://localhost:5000/api/products", {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify(newProduct),
                });
                if (!res.ok){
                    const error = await res.json();
                    throw new Error(error.message || "something went wrong")
                }
                const data = await res.json();
                set((state) => ({products:[...state.products, data.data]}))
                 toast.success("Product created successfully!")
            } catch(error){
                console.error("Error creating product:", error.message);
                //  toast.error("Failed to create Product!");
    
            }     
            },
        fetchProducts: async () =>{
            const res = await fetch("http://localhost:5000/api/products");
            const data = await res.json();
            set({products: data.data});

        },
        deleteProduct: async (pid) =>{
            const res = await fetch(`http://localhost:5000/api/products/${pid}`,{
                method:"DELETE",
            });
            const data = await res.json();
            if(!data.success) return {success:false, message:data.message };
         // update the UI immediately without needing a refresh
            set(state => ({ products: state.products.filter(product => product._id !== pid) }));
            return {success:true, message:data.message}

        },
        updateProduct: async (pid, updatedProduct) =>{
          const res  = await fetch(`http://localhost:5000/api/products/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify(updatedProduct),
          });

          const data = await res.json();
          if (!data.success) return {success:false, message: data.message};
          set((state) => ({
            products: state.products.map((product) => (product._id == pid ? data.data : product)),
          }))
        },
   
        
        
    }
    
))

