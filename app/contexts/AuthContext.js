'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const AuthContext = createContext(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // Demo users for testing
  const demoUsers = [
    {
      id: 'buyer-1',
      email: 'buyer@demo.com',
      password: 'password123',
      name: 'John Buyer',
      role: 'buyer',
      city: 'Mumbai',
      isVerified: true
    },
    {
      id: 'seller-1',
      email: 'seller@demo.com',
      password: 'password123',
      name: 'Jane Seller',
      role: 'seller',
      city: 'Mumbai',
      isVerified: true,
      businessName: 'Jane\'s Crafts',
      description: 'Beautiful handmade items'
    },
    {
      id: 'admin-1',
      email: 'admin@demo.com',
      password: 'password123',
      name: 'Admin User',
      role: 'admin',
      city: 'Mumbai',
      isVerified: true
    }
  ]

  useEffect(() => {
    // Check for saved user session
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Error parsing saved user:', error)
        localStorage.removeItem('currentUser')
      }
    }
  }, [])

  const login = async (email, password) => {
    try {
      setIsLoading(true)
      console.log('Attempting login for:', email)
      
      // Find demo user
      const demoUser = demoUsers.find(u => 
        u.email === email.trim().toLowerCase() && u.password === password
      )

      if (!demoUser) {
        toast.error('Invalid email or password. Please check your credentials.')
        return false
      }

      // Set user without password
      const { password: _, ...userWithoutPassword } = demoUser
      setUser(userWithoutPassword)
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword))
      
      console.log('Login successful')
      toast.success('Welcome back!')
      return true

    } catch (error) {
      console.error('Critical login error:', error)
      toast.error('An unexpected error occurred. Please try again.')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (
    email,
    password,
    name,
    role = 'buyer',
    city = 'Mumbai',
    businessName,
    description,
    mobile,
    verificationDoc
  ) => {
    try {
      setIsLoading(true)
      console.log('Attempting registration for:', email, 'as', role)
      
      // Check if email already exists
      const existingUser = demoUsers.find(u => u.email === email.trim().toLowerCase())
      if (existingUser) {
        toast.error('This email is already registered. Please try logging in.')
        return false
      }
      
      // Create new user
      const newUser = {
        id: `user-${Date.now()}`,
        email: email.trim().toLowerCase(),
        name,
        role,
        city,
        isVerified: role === 'buyer' || role === 'admin',
        businessName: role === 'seller' ? businessName : undefined,
        description: role === 'seller' ? description : undefined,
        mobile: role === 'seller' ? mobile : undefined
      }
      
      // Add to demo users (in real app, this would be saved to database)
      demoUsers.push({ ...newUser, password })
      
      // Set current user
      setUser(newUser)
      localStorage.setItem('currentUser', JSON.stringify(newUser))
      
      console.log('Registration successful')
      
      if (role === 'seller') {
        toast.success('Seller account created successfully! Please wait for admin approval to start listing products.')
      } else {
        toast.success('Account created successfully! Welcome to Zaryah!')
      }
      return true
      
    } catch (error) {
      console.error('Critical registration error:', error)
      toast.error('An unexpected error occurred. Please try again.')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      console.log('Logging out user...')
      setIsLoading(true)
      
      setUser(null)
      localStorage.removeItem('currentUser')
      toast.success('Logged out successfully')
      console.log('Logout successful')
      
    } catch (error) {
      console.error('Unexpected logout error:', error)
      toast.error('Logout failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}