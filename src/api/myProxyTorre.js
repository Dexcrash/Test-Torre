import axios from 'axios'

export default axios.create({
  baseURL: 'https://us-central1-test-back-torre.cloudfunctions.net/app',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})