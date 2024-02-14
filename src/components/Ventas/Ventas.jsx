import React, { useEffect, useState } from 'react'
import { db } from '../../config/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { useUser } from '../../UserContext/UserProvider'
import { img } from "./assets/assets.js"
import GeoLocation from '../GeoLocation/GeoLocation.jsx'

const Ventas = () => {
  const { user, logout } = useUser()
  const [productos, setProductos]= useState ([])
  
  const getProductos = async () =>{
    const productosRef = collection(db,"productos")
    const productosSnap = await getDocs(productosRef)

    let productosData = []
    if (productosSnap) {
      productosData = productosSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      console.log(productosData);
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
      <header>
        { user? 
        <>
          <p className=''>{user.email}</p>
          <GeoLocation/> 
        </>
        : <p>Login please</p>}
      </header>  
      <main>
        {user? 
        <>
          <button onClick={logout}>Logout</button>
          <h2>Productos</h2>
          <ul>
          {productos.map(producto => (
            <li key={producto.id}>
              <div>
                <p><strong>Nombre: </strong>{producto.nombre}</p>
                <p><strong>Precio: </strong>${producto.precio_venta}</p>
              </div>
              <div>
                <img className='img-fluid' src= {img[producto.nombre]}  alt='img de producto'/>
              </div>
            </li>
          ))}
          </ul>
        </> : <>Login first</>
        }
      </main>
    </>
  )
}

export default Ventas