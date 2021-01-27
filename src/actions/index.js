export const addToBasket = (id, title, image, price, rating) => {
  return {
    type: 'ADD_TO_BASKET',
    payload: {
      id: id,
      title: title,
      image: image,
      price: price,
      rating: rating
    }
  }
};

export const removeFromBasket = (id) => {
  return {
    type: 'REMOVE_FROM_BASKET',
    id: id
  }
};

export const addUser = (user) => {
  return {
    type: 'SET_USER',
    user: user
  }
}

export const emptyBasket = () => {
  return {
    type: 'EMPTY_BASKET'
  }
}