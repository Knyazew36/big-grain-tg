import { Toaster } from '@/components/ui/sonner'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
interface ServiceProviderProps {
  children: React.ReactNode
}
async function loadPreline() {
  return import('preline/dist/index.js')
}
const queryClient = new QueryClient()
const ServiceProvider = ({ children }: ServiceProviderProps) => {
  const location = useLocation()

  useEffect(() => {
    const initPreline = async () => {
      await loadPreline()

      if (window.HSStaticMethods && typeof window.HSStaticMethods.autoInit === 'function') {
        window.HSStaticMethods.autoInit()
      }
    }

    initPreline()
  }, [location.pathname])

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster />
      </QueryClientProvider>
    </>
  )
}

export default ServiceProvider
