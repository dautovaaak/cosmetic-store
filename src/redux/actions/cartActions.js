export const addToCart = (product) => ({
  type: 'ADD_TO_CART',
  payload: {
    ...product,
    quantity: 1,
  },
});

export const removeFromCart = (productId) => ({
  type: 'REMOVE_FROM_CART',
  payload: {
    id: productId,
  },
});

export const updateCartItemQuantity = (productId, newQuantity) => ({
  type: 'UPDATE_CART_ITEM_QUANTITY',
  payload: {
    id: productId,
    quantity: newQuantity,
  },
});
