import { createContext, useState } from "react";

export const StoreContext = createContext(null);

function StoreContextProvider(props) {

  const [cartItems, setCartItems] = useState({});

  // ➕ Add Item
  const addToCart = (itemId) => {

    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] ? prev[itemId] + 1 : 1
    }));

  };

  // ➖ Remove Item
  const removeFromCart = (itemId) => {

    setCartItems((prev) => {

      if (!prev[itemId]) return prev;

      const updatedCart = { ...prev };

      if (updatedCart[itemId] === 1) {
        delete updatedCart[itemId]; // remove item if qty = 0
      } else {
        updatedCart[itemId] -= 1;
      }

      return updatedCart;

    });

  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
}

export default StoreContextProvider;