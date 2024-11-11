import { useState, useEffect } from "react";
import Guitar from "./components/Guitar";
import Header from "./components/Header";
import { db } from "./data/db";

function App() {

    const initialCart = () => {
        const localData = localStorage.getItem('cart');
        return localData ? JSON.parse(localData) : [];
    }

    const [data] = useState(db);
    const [cart, setCart] = useState(initialCart);


    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    function addToCart(item){
        // console.log('Agregando al carrito', item.id, item.name);
        const exists = cart.findIndex((element) => element.id === item.id);
        // console.log("Valor de exists", exists);
        
        if(exists===-1){ //no existe por lo tanto lo agrego
            // console.log('Agregaste al carrito', item.name);
            item.quantity = 1;
            setCart([...cart, item]);
        }else{ //exists es diferente de -1, es decir que si existe
            console.log('Ya agregaste este item al carrito:', cart[exists].name);

            // const prevCart = cart; ESTO NO FUNCIONA, ES MALA PRACTICA, NO SE DEBE MUTAR EL ESTADO DIRECTAMENTE, prevCart tiene la misma referencia que cart, es decir que si modifico prevCart, tambien modifico cart

            increaseQuantity(item.id);
            // const prevCart = [...cart];
            // prevCart[exists].quantity++;
            // setCart([...prevCart]);
        }
    }

    function removeFromCart(id){
        const newCart = cart.filter((item) => item.id !== id);
        setCart(newCart);
    }

    function increaseQuantity(id){
        const exists = cart.findIndex((element) => element.id === id);
        const prevCart = [...cart];
        if (prevCart[exists].quantity <10){
             prevCart[exists].quantity++;
             setCart([...prevCart]);
        }
    }

    function decreaseQuantity(id){
        const exists = cart.findIndex((element) => element.id === id);
        const prevCart = [...cart];
        if (prevCart[exists].quantity >1){
             prevCart[exists].quantity--;
             setCart([...prevCart]);
        }
    }

    function clearCart(){
        setCart([]);
    }

    return (
        <>
            <Header 
                cart={cart}
                removeFromCart={removeFromCart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                clearCart={clearCart}
            />

            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                <div className="row mt-5">
                    {data.map((guitar) => {
                        // console.log(guitar);

                        return <Guitar key={guitar.id} guitar={guitar} addToCart={addToCart} />;
                    })}
                </div>
            </main>

            <footer className="bg-dark mt-5 py-5">
                <div className="container-xl">
                    <p className="text-white text-center fs-4 mt-4 m-md-0">
                        GuitarLA - Todos los derechos Reservados
                    </p>
                </div>
            </footer>
        </>
    );
}

export default App;
