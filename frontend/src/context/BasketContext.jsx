import React, { createContext, useContext, useState } from 'react';
import axios from '../api/axiosConfig';

const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [basket, setBasket] = useState([]);
  const [showBasket, setShowBasket] = useState(false);

  const addToBasket = (car, quantity = 1) => {
    setBasket(prev => {
      const existing = prev.find(item => item.car._id === car._id);
      const updated = existing
        ? prev.map(item =>
            item.car._id === car._id ? { ...item, quantity: item.quantity + quantity } : item
          )
        : [...prev, { car, quantity }];
      
      // ✅ Sync to server
      syncBasketWithServer(updated);
      return updated;
    });
  };

  const syncBasketWithServer = async () => {
    try {
      await axios.post('/basket', { items: basket });
    } catch (err) {
      console.error('Basket sync failed:', err);
    }
  };

  const removeFromBasket = (carId) => {
    setBasket(prev => prev.filter(item => item.car._id !== carId));
  };

  const clearBasket = () => {
    setBasket([]);
  };

  const toggleBasketModal = () => {
    setShowBasket(prev => !prev);
  };

  return (
    <BasketContext.Provider value={{ basket, addToBasket, removeFromBasket, clearBasket, showBasket, toggleBasketModal }}>
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => useContext(BasketContext);