export interface CreateReceiptDto {
  productId: number
  quantity: number
}

export interface Receipt {
  id: number
  createdAt: Date
  productId: number
  quantity: number
  operatorId: number | null
}
