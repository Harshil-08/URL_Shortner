import { useState } from "react"
import axios from "axios"
import { motion } from "framer-motion"
import { Copy, LinkIcon } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'

export default function App() {
  const [originalUrl, setOriginalUrl] = useState("")
  const [shortID, setShortID] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleShorten = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    try {
      const response = await axios.post("/api/shorten", { originalURL: originalUrl })
      setShortID(response.data.shortID)
      toast.success("URL shortened successfully!")
    } catch (error) {
      setError("Failed to shorten URL. Please try again.")
      toast.error("Failed to shorten URL. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url)
    toast.success("Copied to clipboard!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Mini URL</h1>
        <form onSubmit={handleShorten} className="space-y-4">
          <div className="relative">
            <input
              className="w-full p-4 pr-12 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              type="url"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="Enter your long URL"
              required
            />
            <LinkIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-purple-600 text-white font-semibold py-3 rounded-lg transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Shortening..." : "Shorten URL"}
          </motion.button>
        </form>
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        {shortID && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 p-4 bg-gray-100 rounded-lg"
          >
            <p className="text-gray-700 mb-2">Shortened URL:</p>
            <div className="flex items-center justify-between bg-white border border-gray-300 rounded-lg p-2">
              <input
                className="flex-grow text-purple-600 font-medium focus:outline-none"
                type="text"
                value={`https://miniurl-z06g.onrender.com/${shortID}`}
                readOnly
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => copyToClipboard(`https://miniurl-z06g.onrender.com/${shortID}`)}
                className="ml-2 p-2 text-purple-600 hover:text-purple-700 focus:outline-none"
              >
                <Copy size={20} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.div>
      <Toaster />
    </div>
  )
}

