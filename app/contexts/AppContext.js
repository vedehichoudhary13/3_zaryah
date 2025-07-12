'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import toast from 'react-hot-toast'

const AppContext = createContext(undefined)

export const useApp = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

const defaultTheme = {
  name: 'default',
  colors: {
    primary: 'primary-500',
    secondary: 'mint-400',
    accent: 'blush-400'
  },
  isActive: true
}

export const AppProvider = ({ children }) => {
  const { user } = useAuth()
  const [products, setProducts] = useState([])
  const [sellers, setSellers] = useState([])
  const [deliveryCities, setDeliveryCities] = useState([])
  const [currentTheme, setCurrentTheme] = useState(defaultTheme)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Initialize with sample data
    setProducts(getSampleProducts())
    setIsLoading(false)
  }, [])

  const refreshData = () => {
    // Refresh with sample data
    setProducts(getSampleProducts())
  }

  // Fallback sample products for when database is not available
  const getSampleProducts = () => [
    // Sample products for demo/fallback
    {
      id: 'sample-1',
      sellerId: 'sample-seller-1',
      sellerName: 'Priya Sharma',
      name: 'Handcrafted Ceramic Vase',
      price: 1299,
      image: 'https://images.pexels.com/photos/5553045/pexels-photo-5553045.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Beautiful handmade ceramic vase with traditional patterns',
      city: 'Mumbai',
      instantDeliveryEligible: true,
      status: 'approved',
      category: 'Home Decor',
      tags: ['handmade', 'ceramic', 'home-decor'],
      createdAt: new Date().toISOString()
    },
    {
      id: 'sample-2',
      sellerId: 'sample-seller-2',
      sellerName: 'Ravi Kumar',
      name: 'Artisan Soy Candles',
      price: 599,
      image: 'https://images.pexels.com/photos/5624983/pexels-photo-5624983.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Natural soy candles with essential oils',
      city: 'Mumbai',
      instantDeliveryEligible: true,
      status: 'approved',
      category: 'Candles',
      tags: ['handmade', 'candles', 'natural'],
      createdAt: new Date().toISOString()
    },
    {
      id: 'sample-3',
      sellerId: 'sample-seller-3',
      sellerName: 'Meera Patel',
      name: 'Handwoven Textile Art',
      price: 2499,
      image: 'https://images.pexels.com/photos/6195121/pexels-photo-6195121.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Traditional handwoven textile with intricate patterns',
      city: 'Mumbai',
      instantDeliveryEligible: false,
      status: 'approved',
      category: 'Textiles',
      tags: ['handmade', 'textiles', 'traditional'],
      createdAt: new Date().toISOString()
    },
    {
      id: 'sample-4',
      sellerId: 'sample-seller-4',
      sellerName: 'Arjun Singh',
      name: 'Wooden Jewelry Box',
      price: 899,
      image: 'https://images.pexels.com/photos/1030303/pexels-photo-1030303.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Handcrafted wooden jewelry box with carved details',
      city: 'Delhi',
      instantDeliveryEligible: false,
      status: 'approved',
      category: 'Jewelry',
      tags: ['handmade', 'wood', 'jewelry'],
      createdAt: new Date().toISOString()
    }
  ]

  const addProduct = async (productData) => {
    if (!user) {
      console.error('No user found for adding product')
      toast.error('You must be logged in to add products')
      return false
    }

    try {
      const newProduct = {
        id: `product-${Date.now()}`,
        sellerId: user.id,
        sellerName: user.name,
        name: productData.name,
        price: productData.price,
        image: productData.image || 'https://images.pexels.com/photos/1030303/pexels-photo-1030303.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: productData.description,
        city: user.city,
        instantDeliveryEligible: false,
        status: 'pending',
        category: productData.category,
        tags: productData.tags || [],
        createdAt: new Date().toISOString()
      }

      setProducts(prev => [newProduct, ...prev])
      toast.success('Product added successfully!')
      console.log('Product added successfully')
      return true
    } catch (error) {
      console.error('Error in addProduct:', error)
      toast.error('Failed to add product')
      return false
    }
  }

  const updateProduct = async (productId, updates) => {
    try {
      console.log('Updating product:', productId, updates)

      setProducts(prev => prev.map(product =>
        product.id === productId ? { ...product, ...updates } : product
      ))

      toast.success('Product updated successfully!')
      console.log('Product updated successfully')
      return true
    } catch (error) {
      console.error('Error in updateProduct:', error)
      toast.error('Failed to update product')
      return false
    }
  }

  const updateDeliveryCity = async (cityId, isActive) => {
    try {
      console.log('Updating delivery city:', cityId, isActive)
      // Mock update for demo
      toast.success('Delivery city updated successfully!')
      return true
    } catch (error) {
      console.error('Error in updateDeliveryCity:', error)
      toast.error('Failed to update delivery city')
      return false
    }
  }

  const updateTheme = async (themeName) => {
    try {
      console.log('Updating theme to:', themeName)
      // Mock update for demo
      setCurrentTheme(prev => ({ ...prev, name: themeName }))
      toast.success('Theme updated successfully!')
      return true
    } catch (error) {
      console.error('Error in updateTheme:', error)
      toast.error('Failed to update theme')
      return false
    }
  }

  return (
    <AppContext.Provider value={{
      products,
      sellers,
      deliveryCities,
      currentTheme,
      addProduct,
      updateProduct,
      updateDeliveryCity,
      updateTheme,
      refreshData,
      isLoading
    }}>
      {children}
    </AppContext.Provider>
  )
}