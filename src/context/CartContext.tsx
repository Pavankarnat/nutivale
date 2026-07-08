"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  size: string; // Dynamic packaging size (e.g. 500 ml, 1 Ltr)
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Load cart from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("nutivale_cart");
    let parsedCart: CartItem[] = [];
    if (savedCart) {
      try {
        parsedCart = JSON.parse(savedCart);
      } catch (e) {
        console.error("Error parsing cart from localStorage", e);
      }
    }

    // Set state asynchronously to avoid synchronous cascading renders warning from ESLint
    const timer = setTimeout(() => {
      if (parsedCart.length > 0) {
        setCartItems(parsedCart);
      }
      setIsMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Save cart to local storage when it changes
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("nutivale_cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isMounted]);

  const addToCart = (product: Omit<CartItem, "quantity">) => {
    // If the id doesn't already contain the size suffix, make it composite
    const compositeId = product.id.endsWith(`-${product.size}`)
      ? product.id
      : `${product.id}-${product.size}`;

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === compositeId);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === compositeId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, id: compositeId, quantity: 1 }];
    });
    setIsCartOpen(true); // Open the cart side drawer automatically on add
  };

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
