import React, { useState, useContext, useReducer, useEffect } from "react";
import cartItems from "./data";
import reducer from "./reducer";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-useReducer-cart-project";
const AppContext = React.createContext();

const defaultValues = {
  isLoading: false,
  cart: [],
  total: 0,
  amount: 0,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultValues);

  // Fetch data from API
  const fetchData = async () => {
    dispatch({ type: "LOADING", value: true });

    const response = await fetch(url);
    if (!response.ok) return console.error("Error in fetching data from API");
    const data = await response.json();
    if (data) {
      dispatch({ type: "LOADING", value: false });
      dispatch({ type: "DISPLAY_DATA", value: data });
    }
  };

  // Remove all item in cart
  const handleClearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  // Remove single item from cart using id
  const handleRemoveItem = (id) => {
    dispatch({ type: "REMOVE_SINGLE_ITEM", value: id });
  };
  const handleIncrease = (id) => {
    dispatch({ type: "INCREASE_CART_QTY", value: id });
  };
  const handleDecrease = (id) => {
    dispatch({ type: "DECREASE_CART_QTY", value: id });
  };

  // Get Amount whenever cart item changes
  useEffect(() => {
    dispatch({ type: "GET_TOTAL" });
  }, [state.cart]);

  // Fetch data after render
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        handleClearCart,
        handleRemoveItem,
        handleIncrease,
        handleDecrease,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
