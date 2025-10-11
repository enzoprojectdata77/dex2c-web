import axios from "axios"

// Dummy base URL - replace with actual API endpoint
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://dex2c.example.com"

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 0,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add any auth tokens or custom headers here
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle errors globally
    if (error.response?.status === 429) {
      console.error("Rate limit exceeded")
    }
    return Promise.reject(error)
  },
)
