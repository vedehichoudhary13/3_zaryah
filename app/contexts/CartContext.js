'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext(undefined)

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Load cart from localStorage on mount (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('giftflare-cart')
      if (savedCart) {
        try {
          setItems(JSON.parse(savedCart))
        } catch (error) {
          console.error('Error loading cart from localStorage:', error)
        }
      }
    }
  }, [])

  // Save cart to localStorage whenever items change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('giftflare-cart', JSON.stringify(items))
    }
  }, [items])

  const addToCart = (product, options = {}) => {
    const existingItem = items.find(item => 
      item.product.id === product.id && 
      item.giftPackaging === (options.giftPackaging || false)
    )

    if (existingItem) {
      updateQuantity(existingItem.id, existingItem.quantity + (options.quantity || 1))
    } else {
      const newItem = {
        id: `${product.id}-${Date.now()}-${options.giftPackaging ? 'gift' : 'regular'}`,
        product,
        quantity: options.quantity || 1,
        giftPackaging: options.giftPackaging || false,
        giftNote: ''
      }
      setItems(prev => [...prev, newItem])
    }
    setIsCartOpen(true)
  }

  const removeFromCart = (itemId) => {
    setItems(prev => prev.filter(item => item.id !== itemId))
  }

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId)
    } else {
      setItems(prev => prev.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      ))
    }
  }

  const updateCartItem = (itemId, updates) => {
    setItems(prev => prev.map(item =>
      item.id === itemId ? { ...item, ...updates } : item
    ))
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      return total + (item.product.price * item.quantity)
    }, 0)
  }

  const getGiftPackagingCost = () => {
    return items.filter(item => item.giftPackaging).length * 30 // ₹30 per gift item
  }

  const getDeliveryCost = (deliveryType) => {
    if (deliveryType === 'instant') {
      return 99 // ₹99 for instant delivery via Dunzo
    }
    return getTotalPrice() >= 500 ? 0 : 50 // Free delivery above ₹500, otherwise ₹50
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      updateCartItem,
      clearCart,
      getTotalPrice,
      getTotalItems,
      getGiftPackagingCost,
      getDeliveryCost,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  )
}