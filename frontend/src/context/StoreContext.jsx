import { createContext, useState } from "react";

export const StoreContext = createContext(null);

function StoreContextProvider(props) {

  const [cartItems, setCartItems] = useState({});

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] ? prev[itemId] + 1 : 1
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] - 1
    }));
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