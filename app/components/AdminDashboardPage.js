'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Package, 
  TrendingUp, 
  Settings,
  Eye,
  Check,
  X,
  Edit,
  Trash2
} from 'lucide-react'

export const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [products, setProducts] = useState([
    {
      id: '1',
      name: 'Handcrafted Ceramic Vase',
      sellerName: 'Priya Sharma',
      price: 1299,
      status: 'pending',
      image: 'https://images.pexels.com/photos/5553045/pexels-photo-5553045.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '2',
      name: 'Artisan Soy Candles',
      sellerName: 'Ravi Kumar',
      price: 599,
      status: 'approved',
      image: 'https://images.pexels.com/photos/5624983/pexels-photo-5624983.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ])

  const [sellers, setSellers] = useState([
    {
      id: '1',
      name: 'Priya Sharma',
      email: 'priya@example.com',
      businessName: 'Priya Ceramics',
      status: 'verified',
      productsCount: 5
    },
    {
      id: '2',
      name: 'Ravi Kumar',
      email: 'ravi@example.com',
      businessName: 'Natural Candles Co',
      status: 'pending',
      productsCount: 3
    }
  ])

  const updateProductStatus = (productId, newStatus) => {
    setProducts(prev => prev.map(product =>
      product.id === productId ? { ...product, status: newStatus } : product
    ))
  }

  const updateSellerStatus = (sellerId, newStatus) => {
    setSellers(prev => prev.map(seller =>
      seller.id === sellerId ? { ...seller, status: newStatus } : seller
    ))
  }

  const stats = [
    { title: 'Total Products', value: '156', icon: Package, color: 'bg-blue-500' },
    { title: 'Active Sellers', value: '23', icon: Users, color: 'bg-green-500' },
    { title: 'Pending Reviews', value: '8', icon: Eye, color: 'bg-yellow-500' },
    { title: 'Monthly Revenue', value: '₹45,230', icon: TrendingUp, color: 'bg-purple-500' }
  ]

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'sellers', label: 'Sellers', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your marketplace</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">New seller registration</p>
                      <p className="text-sm text-gray-600">Ravi Kumar applied to join</p>
                    </div>
                    <span className="text-sm text-gray-500">2 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Product submitted for review</p>
                      <p className="text-sm text-gray-600">Handcrafted Ceramic Vase</p>
                    </div>
                    <span className="text-sm text-gray-500">5 hours ago</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Product Management</h3>
                <div className="space-y-4">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div>
                          <h4 className="font-medium">{product.name}</h4>
                          <p className="text-sm text-gray-600">by {product.sellerName}</p>
                          <p className="text-sm font-semibold">₹{product.price}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          product.status === 'approved' 
                            ? 'bg-green-100 text-green-800'
                            : product.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.status}
                        </span>
                        {product.status === 'pending' && (
                          <>
                            <button
                              onClick={() => updateProductStatus(product.id, 'approved')}
                              className="p-2 text-green-600 hover:bg-green-100 rounded-lg"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => updateProductStatus(product.id, 'rejected')}
                              className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'sellers' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Seller Management</h3>
                <div className="space-y-4">
                  {sellers.map((seller) => (
                    <div key={seller.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium">{seller.name}</h4>
                        <p className="text-sm text-gray-600">{seller.email}</p>
                        <p className="text-sm text-gray-600">{seller.businessName}</p>
                        <p className="text-xs text-gray-500">{seller.productsCount} products</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          seller.status === 'verified' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {seller.status}
                        </span>
                        {seller.status === 'pending' && (
                          <>
                            <button
                              onClick={() => updateSellerStatus(seller.id, 'verified')}
                              className="p-2 text-green-600 hover:bg-green-100 rounded-lg"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => updateSellerStatus(seller.id, 'rejected')}
                              className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Platform Settings</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Platform Commission (%)
                    </label>
                    <input
                      type="number"
                      defaultValue="10"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum Order Value
                    </label>
                    <input
                      type="number"
                      defaultValue="100"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                    Save Settings
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}