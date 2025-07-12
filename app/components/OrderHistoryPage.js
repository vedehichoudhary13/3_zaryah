'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Package, Truck, CheckCircle, Clock, Star } from 'lucide-react'

export const OrderHistoryPage = () => {
  const [orders] = useState([
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 1899,
      items: [
        {
          id: '1',
          name: 'Handcrafted Ceramic Vase',
          price: 1299,
          quantity: 1,
          image: 'https://images.pexels.com/photos/5553045/pexels-photo-5553045.jpeg?auto=compress&cs=tinysrgb&w=800'
        },
        {
          id: '2',
          name: 'Artisan Soy Candles',
          price: 599,
          quantity: 1,
          image: 'https://images.pexels.com/photos/5624983/pexels-photo-5624983.jpeg?auto=compress&cs=tinysrgb&w=800'
        }
      ]
    },
    {
      id: 'ORD-002',
      date: '2024-01-20',
      status: 'shipped',
      total: 2499,
      items: [
        {
          id: '3',
          name: 'Handwoven Textile Art',
          price: 2499,
          quantity: 1,
          image: 'https://images.pexels.com/photos/6195121/pexels-photo-6195121.jpeg?auto=compress&cs=tinysrgb&w=800'
        }
      ]
    },
    {
      id: 'ORD-003',
      date: '2024-01-25',
      status: 'processing',
      total: 899,
      items: [
        {
          id: '4',
          name: 'Wooden Jewelry Box',
          price: 899,
          quantity: 1,
          image: 'https://images.pexels.com/photos/1030303/pexels-photo-1030303.jpeg?auto=compress&cs=tinysrgb&w=800'
        }
      ]
    }
  ])

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'shipped':
        return <Truck className="w-5 h-5 text-blue-500" />
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-500" />
      default:
        return <Package className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'shipped':
        return 'bg-blue-100 text-blue-800'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
          <p className="text-gray-600 mt-2">Track your orders and view past purchases</p>
        </div>

        <div className="space-y-6">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Order Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(order.status)}
                      <span className="font-semibold text-gray-900">Order {order.id}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Placed on {formatDate(order.date)}</p>
                    <p className="font-bold text-lg">₹{order.total.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{item.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Actions */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                  <div className="flex space-x-3">
                    {order.status === 'delivered' && (
                      <button className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium">
                        <Star className="w-4 h-4" />
                        <span>Rate & Review</span>
                      </button>
                    )}
                    <button className="text-gray-600 hover:text-gray-700 font-medium">
                      View Details
                    </button>
                  </div>
                  <div className="flex space-x-3">
                    {order.status !== 'delivered' && (
                      <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                        Track Order
                      </button>
                    )}
                    {order.status === 'delivered' && (
                      <button className="bg-secondary-600 text-white px-4 py-2 rounded-lg hover:bg-secondary-700 transition-colors">
                        Reorder
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {orders.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gray-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
            <button className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors">
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  )
}