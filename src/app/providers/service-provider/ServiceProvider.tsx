import { Toaster } from '@/components/ui/sonner'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import BottomSheetSuccess from '@/shared/bottom-sheet/bottom-sheet-success/ui/BottomSheetSuccess'
import { useBottomSheetStore } from '@/shared/bottom-sheet/model/store.bottom-sheet'
interface ServiceProviderProps {
  children: React.ReactNode
}
async function loadPreline() {
  return import('preline/dist/index.js')
}
const queryClient = new QueryClient()
const ServiceProvider = ({ children }: ServiceProviderProps) => {
  const location = useLocation()
  const { isOpen, title, description, close } = useBottomSheetStore()

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
        <BottomSheetSuccess
          isOpen={isOpen}
          onClose={close}
          title={title}
          description={description}
        />
      </QueryClientProvider>
    </>
  )
}

export default ServiceProvider
