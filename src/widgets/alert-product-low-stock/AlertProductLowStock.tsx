import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { productGetAll } from '@/entitites/product/api/product.api'
import { Product } from '@/entitites/product/model/product.type'
import { LucideMailWarning } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const AlertProductLowStock = () => {
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([])

  const getLowStockProducts = async () => {
    const allProducts = await productGetAll()
    const lowStock = allProducts.filter(p => p.quantity < p.minThreshold)
    setLowStockProducts(lowStock)
  }

  useEffect(() => {
    getLowStockProducts()
  }, [])

  if (lowStockProducts.length === 0) return null

  return (
    <Alert
      variant='destructive'
      className='mt-4 border-red-400'
    >
      <LucideMailWarning />
      <AlertTitle>Внимание! На складе заканчивается:</AlertTitle>
      <AlertDescription>
        {lowStockProducts.map(p => (
          <div key={p.id}>
            <span className='font-medium'>{p.name}</span>: {p.quantity} (минимум: {p.minThreshold})
          </div>
        ))}
      </AlertDescription>
    </Alert>
  )
}

export default AlertProductLowStock
