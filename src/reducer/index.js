import { combineReducers } from 'redux';

const initialState = {
  basket: [],
  user: {}
};

const BasketReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_BASKET':
      return { ...state, basket: [...state.basket, action.payload] };
    case 'REMOVE_FROM_BASKET':
      const index = state.basket.findIndex(basketItem => basketItem.id === action.id)
      let newBasket = [...state.basket];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(`Cannot remove the item id=${action.id}`);
      }
      return { ...state, basket: newBasket };
    case 'EMPTY_BASKET':
      return {...state, basket: []}
    default:
      return state;
  }
};

const userReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.user };
    default:
      return state;
  }
}

export default combineReducers({
  basket: BasketReducer,
  userInfo: userReducer
});