import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import styles from '../styles/index.module.css'
import { baseUrl } from '../global'
export default function LoginPage() {
  const [mobile, setMobile] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const requestOtp = async () => {
    if (!mobile.match(/^[6-9]\d{9}$/)) {
      alert('Enter a valid 10-digit mobile number')
      return
    }

    try {
      setLoading(true)
     const data=  await axios.post(`${baseUrl}/auth/request-otp`, { mobile })
     console.log(data,'lll')
      setStep(2)
      alert('OTP sent ( you can check the otp in terminal console and enter it on UI)')
    } catch (err) {
      console.error(err)
      alert('Failed to request OTP')
    } finally {
      setLoading(false)
    }
  }

  const verifyOtp = async () => {
    if (!otp || otp.length < 4) {
      alert('Enter valid OTP')
      return
    }

    try {
      setLoading(true)
      const res = await axios.post(`${baseUrl}/auth/verify-otp`, { mobile, otp })
      localStorage.setItem('token', res.data.access_token)
      router.push('/orders')     //route for orders creation and lookups
    } catch (err) {
      console.error(err)
      alert('Invalid OTP')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Login with OTP</h1>

        {step === 1 && (
          <div className={styles.form}>
            <input
              type="tel"
              placeholder="Enter Mobile Number"
              value={mobile}
              onChange={e => setMobile(e.target.value)}
              className={styles.input}
              maxLength={10}
            />
            <button
              onClick={requestOtp}
              className={styles.button}
              disabled={loading}
            >
              {loading ? 'Sending OTP...' : 'Request OTP'}
            </button>
          </div>
        )}

        {step === 2 && (
          <div className={styles.form}>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              className={styles.input}
              maxLength={6}
            />
            <button
              onClick={verifyOtp}
              className={styles.button}
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
