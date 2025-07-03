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

export interface StatisticsProduct {
  product: {
    id: number
    name: string
    // другие поля продукта
  } | null
  quantity: number
}

export interface StatisticsOperation {
  type: 'income' | 'outcome'
  date: string // ISO string
  user: {
    id: number
    username: string
    // другие поля пользователя
  } | null
  products: StatisticsProduct[]
}

export interface StatisticsResponse {
  periodStart: string // ISO string
  periodEnd: string // ISO string
  data: StatisticsOperation[]
}
