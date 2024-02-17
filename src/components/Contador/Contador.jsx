import './Contador.css'
import { useState } from "react"

const Contador = ({stock, onAdd}) => {

    const [quantity, setQuantity] = useState(0)

    const increment = () =>{
        (quantity<stock) && setQuantity(quantity+1)
    }

    const decrement = () =>{
        (quantity>0) && setQuantity(quantity-1)
    }

    return(
        <div className="">      
            <button className="" onClick={decrement}>-</button>
            <p className="">{quantity}</p> 
            <button className="" onClick={increment}>+</button>   
{/*             <button className="" onClick={() => onAdd(quantity)} disabled={!stock}>Agregar al carrito</button> */}
        </div>
    )
}

export default Contador