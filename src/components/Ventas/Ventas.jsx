import React, { useEffect, useState } from 'react'
import { db } from '../../config/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { useUser } from '../../UserContext/UserProvider'

const Ventas = () => {
  const { user } = useUser()
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
        { user? <p>{user.email}</p> : <p>No user signed up</p>}
      </header>  
      <main>
        {user? 
        <>
          <h2>Productos</h2>
          <ul>
          {productos.map(producto => (
            <li key={producto.id}>
              <strong>Nombre: </strong>{producto.nombre}
            </li>
          ))}
          </ul>
        </> : <>Login first</>
      }
      </main>
      <footer></footer>
    </>
  )
}

export default Ventas