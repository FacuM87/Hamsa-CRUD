import React, { useEffect, useState } from 'react'
import { db } from '../../config/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { useUser } from '../../UserContext/UserProvider'
import GeoLocation from '../GeoLocation/GeoLocation.jsx'
import TarjetasProducto from '../TarjetasProducto/TarjetasProducto.jsx'
import "./Ventas.css"

const Ventas = () => {
  const { user, nickname, logout } = useUser()
  const [productos, setProductos]= useState ([])

  
  const getProductos = async () =>{
    const productosRef = collection(db,"productos")
    const productosSnap = await getDocs(productosRef)

    let productosData = []
    if (productosSnap) {
      productosData = productosSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setProductos(productosData)
    } else { console.log("Couldnt get data from db") }
  }

  useEffect(() => {
    if (user) {
      try {
        getProductos();
      } catch (error) {
        console.log(error);
      }
    }
  }, [user])

  return (
    <>
		{ user?
		<>
			<header>
				<p className=''>Hola {nickname}!</p>
				<button onClick={logout}>Logout</button>
				<GeoLocation/> 
			</header>  
			<main>
				<h2 className='text-center'>Productos</h2>
				<section className='tarjetasContainer'>
					{productos.map(producto => (
					<TarjetasProducto key={producto.id} {...producto}/>
					))}
				</section>
			</main>
		</> : <>Login first</>
		}
    </>
  )
}

export default Ventas