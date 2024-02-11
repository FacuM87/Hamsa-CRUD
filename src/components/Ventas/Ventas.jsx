import React, { useEffect, useState } from 'react'
import { db } from '../../config/firebase'
import { collection, getDocs } from 'firebase/firestore'

const Ventas = () => {

  const [productos, setProductos]= useState ([])
  
  useEffect(() => {
    const getProductos = async () =>{
      try {
        const productosRef = collection(db,"productos")
        const productosSnap = await getDocs(productosRef)
        
        const productosData = productosSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        console.log(productosData);
  
        if (productosData) {
          setProductos(productosData)
        } else { console.log(productosData); }
      } catch (error) {
        console.log(error);
      }
    }
    getProductos()
  
  }, [])

  return (
    <div>
      <h2>Productos</h2>
      <ul>
      {productos.map(producto => (
        <li key={producto.id}>
          <strong>Nombre: </strong>{producto.nombre}
        </li>
      ))}
      </ul>
    </div>
  )
}

export default Ventas