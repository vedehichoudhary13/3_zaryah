'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Heart, 
  Share2, 
  Star, 
  Truck, 
  Shield, 
  MessageCircle,
  Plus,
  Minus,
  ShoppingBag,
  Gift
} from 'lucide-react'
import { useApp } from '../contexts/AppContext'
import { useCart } from '../contexts/CartContext'
import { InstantDeliveryBadge, DeliveryTimeEstimate } from './InstantDeliveryBadge'

export const ProductDetailPage = ({ productId }) => {
  const { products } = useApp()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isLiked, setIsLiked] = useState(false)
  const [activeTab, setActiveTab] = useState('description')

  const product = products.find(p => p.id === productId)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  const handleAddToCart = (giftPackaging = false) => {
    addToCart(product, { quantity, giftPackaging })
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute top-4 left-4">
                <InstantDeliveryBadge product={product} />
              </div>
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-3 rounded-full shadow-lg transition-all ${
                    isLiked 
                      ? 'bg-red-500 text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-3 bg-white text-gray-600 hover:bg-gray-100 rounded-full shadow-lg transition-all"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600 mb-4">by {product.sellerName}</p>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">(4.8) • 24 reviews</span>
              </div>
              <div className="text-3xl font-bold text-primary-600 mb-6">
                ₹{product.price.toLocaleString()}
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-primary-50 rounded-xl p-4">
              <DeliveryTimeEstimate product={product} />
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-medium">Quantity:</span>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => handleAddToCart(false)}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-4 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2 text-lg"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={() => handleAddToCart(true)}
                className="w-full bg-secondary-600 hover:bg-secondary-700 text-white py-4 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2 text-lg"
              >
                <Gift className="w-5 h-5" />
                <span>Add as Gift (+₹30)</span>
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center">
                <Truck className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Fast Delivery</p>
                <p className="text-xs text-gray-600">Quick & reliable</p>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Secure Payment</p>
                <p className="text-xs text-gray-600">100% protected</p>
              </div>
              <div className="text-center">
                <MessageCircle className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Support</p>
                <p className="text-xs text-gray-600">24/7 help</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Information Tabs */}
        <div className="mt-16">
          <div className="bg-white rounded-2xl shadow-lg">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'description', label: 'Description' },
                  { id: 'reviews', label: 'Reviews (24)' },
                  { id: 'seller', label: 'About Seller' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'description' && (
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {product.description}
                  </p>
                  <h4 className="font-semibold text-gray-900 mb-2">Features:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Handcrafted with premium materials</li>
                    <li>Unique design by skilled artisan</li>
                    <li>Perfect for gifting or personal use</li>
                    <li>Sustainable and eco-friendly</li>
                  </ul>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Customer Reviews</h3>
                    <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                      Write Review
                    </button>
                  </div>
                  
                  {/* Sample Reviews */}
                  <div className="space-y-4">
                    {[
                      {
                        name: 'Priya S.',
                        rating: 5,
                        comment: 'Absolutely beautiful! The craftsmanship is exceptional.',
                        date: '2 days ago'
                      },
                      {
                        name: 'Rahul M.',
                        rating: 4,
                        comment: 'Great quality and fast delivery. Highly recommended!',
                        date: '1 week ago'
                      }
                    ].map((review, index) => (
                      <div key={index} className="border-b border-gray-200 pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{review.name}</span>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'seller' && (
                <div>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary-600">
                        {product.sellerName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{product.sellerName}</h3>
                      <p className="text-gray-600">Artisan from {product.city}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">4.9 seller rating</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    A passionate artisan dedicated to creating beautiful, handcrafted pieces that bring joy and meaning to everyday life. 
                    With years of experience in traditional craftsmanship, each creation tells a unique story.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}