'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Package, Plus, Minus, X, Gift, ShoppingBag } from 'lucide-react'
import { ProductCard } from './ProductCard'
import { useCart } from '../contexts/CartContext'

export const HamperBuilderPage = () => {
  const { addToCart } = useCart()
  const [selectedProducts, setSelectedProducts] = useState([])
  const [hamperName, setHamperName] = useState('')
  const [hamperNote, setHamperNote] = useState('')

  const availableProducts = [
    {
      id: '1',
      name: 'Handcrafted Ceramic Vase',
      sellerName: 'Priya Sharma',
      price: 1299,
      image: 'https://images.pexels.com/photos/5553045/pexels-photo-5553045.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Beautiful handmade ceramic vase with traditional patterns',
      city: 'Mumbai',
      instantDeliveryEligible: true,
      status: 'approved',
      category: 'Home Decor',
      tags: ['handmade', 'ceramic', 'home-decor']
    },
    {
      id: '2',
      name: 'Artisan Soy Candles',
      sellerName: 'Ravi Kumar',
      price: 599,
      image: 'https://images.pexels.com/photos/5624983/pexels-photo-5624983.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Natural soy candles with essential oils',
      city: 'Mumbai',
      instantDeliveryEligible: true,
      status: 'approved',
      category: 'Candles',
      tags: ['handmade', 'candles', 'natural']
    },
    {
      id: '3',
      name: 'Handwoven Textile Art',
      sellerName: 'Meera Patel',
      price: 2499,
      image: 'https://images.pexels.com/photos/6195121/pexels-photo-6195121.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Traditional handwoven textile with intricate patterns',
      city: 'Mumbai',
      instantDeliveryEligible: false,
      status: 'approved',
      category: 'Textiles',
      tags: ['handmade', 'textiles', 'traditional']
    },
    {
      id: '4',
      name: 'Wooden Jewelry Box',
      sellerName: 'Arjun Singh',
      price: 899,
      image: 'https://images.pexels.com/photos/1030303/pexels-photo-1030303.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Handcrafted wooden jewelry box with carved details',
      city: 'Delhi',
      instantDeliveryEligible: false,
      status: 'approved',
      category: 'Jewelry',
      tags: ['handmade', 'wood', 'jewelry']
    }
  ]

  const addToHamper = (product) => {
    const existingItem = selectedProducts.find(item => item.product.id === product.id)
    if (existingItem) {
      setSelectedProducts(prev => prev.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setSelectedProducts(prev => [...prev, { product, quantity: 1 }])
    }
  }

  const removeFromHamper = (productId) => {
    setSelectedProducts(prev => prev.filter(item => item.product.id !== productId))
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromHamper(productId)
    } else {
      setSelectedProducts(prev => prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      ))
    }
  }

  const getTotalPrice = () => {
    return selectedProducts.reduce((total, item) => {
      return total + (item.product.price * item.quantity)
    }, 0)
  }

  const addHamperToCart = () => {
    selectedProducts.forEach(item => {
      for (let i = 0; i < item.quantity; i++) {
        addToCart(item.product, { giftPackaging: true })
      }
    })
    
    // Reset hamper builder
    setSelectedProducts([])
    setHamperName('')
    setHamperNote('')
    
    alert('Hamper added to cart successfully!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3 bg-white px-6 py-3 rounded-full shadow-lg mb-6">
            <Package className="w-8 h-8 text-primary-600" />
            <span className="text-primary-700 font-semibold text-xl">Hamper Builder</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Create Your Perfect Gift Hamper</h1>
          <p className="text-xl text-gray-600">Curate a collection of meaningful gifts that tell a story</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Available Products */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {availableProducts.map((product) => (
                <div key={product.id} className="relative">
                  <ProductCard product={product} />
                  <button
                    onClick={() => addToHamper(product)}
                    className="absolute top-4 right-4 bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-full shadow-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Hamper Builder */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Gift className="w-6 h-6 mr-3 text-primary-600" />
                Your Hamper
              </h2>

              {/* Hamper Details */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hamper Name
                  </label>
                  <input
                    type="text"
                    value={hamperName}
                    onChange={(e) => setHamperName(e.target.value)}
                    placeholder="e.g., Birthday Surprise Bundle"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Personal Note
                  </label>
                  <textarea
                    value={hamperNote}
                    onChange={(e) => setHamperNote(e.target.value)}
                    placeholder="Add a personal message..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>

              {/* Selected Products */}
              <div className="space-y-4 mb-6">
                {selectedProducts.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No products selected yet</p>
                    <p className="text-sm">Add products to start building your hamper</p>
                  </div>
                ) : (
                  selectedProducts.map((item) => (
                    <div key={item.product.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.product.name}</h4>
                        <p className="text-xs text-gray-600">₹{item.product.price}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => removeFromHamper(item.product.id)}
                          className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Total and Add to Cart */}
              {selectedProducts.length > 0 && (
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-2xl font-bold text-primary-600">
                      ₹{getTotalPrice().toLocaleString()}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 mb-4">
                    * Gift packaging included for all items
                  </div>
                  <button
                    onClick={addHamperToCart}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add Hamper to Cart</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}