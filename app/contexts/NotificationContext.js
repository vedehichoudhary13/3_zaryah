'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import toast from 'react-hot-toast'

const NotificationContext = createContext(undefined)

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Welcome to Zaryah!',
      message: 'Start exploring unique handmade gifts from passionate artisans.',
      type: 'info',
      read: false,
      created_at: new Date().toISOString()
    }
  ])

  useEffect(() => {
    if (user) {
      // Initialize with sample notifications
      console.log('User logged in, notifications ready')
    }
  }, [user])

  const markAsRead = async (notificationId) => {
    try {
      setNotifications(prev =>
        prev.map(notification =>
          notification.id === notificationId
            ? { ...notification, read: true }
            : notification
        )
      )
    } catch (error) {
      console.error('Error in markAsRead:', error)
    }
  }

  const markAllAsRead = async () => {
    if (!user) return

    try {
      setNotifications(prev =>
        prev.map(notification => ({ ...notification, read: true }))
      )
    } catch (error) {
      console.error('Error in markAllAsRead:', error)
    }
  }

  const deleteNotification = async (notificationId) => {
    try {
      setNotifications(prev =>
        prev.filter(notification => notification.id !== notificationId)
      )
    } catch (error) {
      console.error('Error in deleteNotification:', error)
    }
  }

  const createNotification = async (notification) => {
    if (!user) return

    try {
      const newNotification = {
        id: Date.now().toString(),
        title: notification.title,
        message: notification.message,
        type: notification.type,
        read: false,
        created_at: new Date().toISOString()
      }
      
      setNotifications(prev => [newNotification, ...prev])
      toast.success(notification.title)
    } catch (error) {
      console.error('Error in createNotification:', error)
    }
  }

  const refreshNotifications = async () => {
    // Mock refresh
    console.log('Notifications refreshed')
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      markAsRead,
      markAllAsRead,
      deleteNotification,
      createNotification,
      refreshNotifications
    }}>
      {children}
    </NotificationContext.Provider>
  )
}