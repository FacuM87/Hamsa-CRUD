import React from 'react'
import { img } from "./assets/assets.js"
import "./TarjetasProducto.css"
import Contador from '../Contador/Contador.jsx'

const TarjetasProducto = ({nombre, precio_venta, stock}) => {
  return (
    <div className='tarjetasProducto'>
        <div className='imgContainer'>
            <img className='img-fluid' src= {img[nombre]} alt='img de producto'/>
        </div>
        <div className='tarjetasInfo'>
            <p><strong>{nombre}</strong></p>
            <p><strong>Precio: </strong>${precio_venta}</p>
			<Contador stock={stock}/>
        </div>
    </div>
  )
}

export default TarjetasProducto