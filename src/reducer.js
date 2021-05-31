const reducer = (state, action) => {
  if (action.type === "CLEAR_CART") {
    return { ...state, cart: [] };
  }
  if (action.type === "REMOVE_SINGLE_ITEM") {
    const cart = state.cart;
    const newCart = cart.filter((item) => item.id !== action.value);
    return { ...state, cart: newCart };
  }
  if (action.type === "INCREASE_CART_QTY") {
    const cart = state.cart;
    const newCart = cart.map((item) => {
      if (item.id.toLowerCase() === action.valuetoLowerCase()) {
        return { ...item, amount: item.amount++ };
      }
      return item;
    });
    return { ...state, cart: newCart };
  }
  if (action.type === "DECREASE_CART_QTY") {
    const cart = state.cart;
    const newCart = cart
      .map((item) => {
        if (item.id.toLowerCase() === action.value.toLowerCase()) {
          if (item.amount === 0) return {};
          else return { ...item, amount: item.amount-- };
        }
        return item;
      })
      .filter((item) => item.amount >= 0);
    return { ...state, cart: newCart };
  }
  if (action.type === "GET_TOTAL") {
    let cartTotal = state.cart.reduce(
      (acc, cartItem) => {
        acc.total += cartItem.price * cartItem.amount;
        acc.amount += cartItem.amount;

        return acc;
      },
      {
        amount: 0,
        total: 0,
      }
    );

    return {
      ...state,
      total: parseFloat(cartTotal.total.toFixed(2)),
      amount: cartTotal.amount,
    };
  }

  if (action.type === "LOADING") {
    return {
      ...state,
      isLoading: action.value,
    };
  }

  if (action.type === "DISPLAY_DATA") {
    return {
      ...state,
      cart: action.value,
    };
  }
};

export default reducer;
