"use client"
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import styles from '../../styles/OrderPage.module.css'
import { baseUrl } from '../../global'
export default function OrdersPage() {
  const [amount, setAmount] = useState('')
  const [orders, setOrders] = useState([])
  const router = useRouter()

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  const fetchOrders = async () => {
    if (!token) {
      router.push('/')
      return
    }

    try {
      const res = await axios.get(`${baseUrl}/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setOrders(res.data)
    } catch (err) {
      console.error('Failed to fetch orders:', err)
    }
  }

  const createOrder = async () => {
    if (!token) {
      router.push('/')
      return
    }

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      alert('Please enter a valid amount')
      return
    }

    try {
      await axios.post(
        `${baseUrl}/orders`,
        { amount: Number(amount) },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setAmount('')
      fetchOrders()
    } catch (err) {
      console.error('Failed to create order:', err)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.heading}>Place a New Order</h1>
        <div className={styles.form}>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className={styles.input}
          />
          <button onClick={createOrder} className={styles.button}>Create Order</button>
        </div>
      </div>

      <div className={styles.card}>
        <h2 className={styles.heading}>Your Orders</h2>
        <ul className={styles.orderList}>
          {orders.map((order: any) => (
            <li key={order.id} className={styles.orderItem}>
              <span><strong>ID:</strong> {order.id}</span>
              <span><strong>Amount:</strong> ₹{order.amount}</span>
              <span><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
