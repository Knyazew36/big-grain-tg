import axios, { AxiosError } from 'axios'

import { ErrorEventEmitter, eventEmitter } from '@/features/error-handler'

import log from './log'
import { ErrorResponse } from './type'
import { toast } from 'sonner'
// import { json } from 'stream/consumers'
import React from 'react'
import { hapticFeedback, isTMA, mockTelegramEnv, retrieveRawInitData } from '@telegram-apps/sdk'

const initDataRaw = isTMA() ? retrieveRawInitData() : ''

const isProduction = false

// Создаем экземпляр Axios
const $api = axios.create({
  withCredentials: true,
  headers: {
    Authorization: `tma ${initDataRaw}`
  }
})

// Интерцептор для запросов
$api.interceptors.request.use(
  async config => {
    if (!isProduction) {
      log({
        name: config.url ?? 'undefined url',
        data: config,
        type: 'request',
        payload: config.data
      })
    }
    return config
  },
  error => {
    hapticFeedback.notificationOccurred('error')

    throw error
  }
)

// Интерцептор для ответов
$api.interceptors.response.use(
  response => {
    if (!isProduction) {
      log({
        name: response.config.url ?? 'undefined url',
        data: response,
        type: 'response'
      })
    }
    if (response?.data?.statusBD === 'loading') {
      const errorData: ErrorEventEmitter = { action: 'navigation', href: '?modal=bd-loading' }

      eventEmitter.emit('request-error', errorData)
    }
    if (response?.data?.data.statusBD === 'error') {
      const errorData: ErrorEventEmitter = { action: 'navigation', href: '?modal=bd-error' }
      eventEmitter.emit('request-error', errorData)
    }

    if (response?.data?.status === 'error') {
    }

    return response
  },
  error => {
    handleResponseError(error as AxiosError<ErrorResponse>)
    logErrorDetails(error as AxiosError)
    toast(error?.response?.data?.message || error?.message, {
      style: { backgroundColor: '#FB2C36', color: '#fff' },
      description: React.createElement(
        'pre',
        { className: 'mt-2 w-[320px] rounded-md bg-neutral-950 p-4' },
        React.createElement('code', { className: 'text-white' }, JSON.stringify(error.response?.data ?? {}, null, 2))
      )
    })

    throw error
  }
)

// Логирование ошибок
function logErrorDetails(error: AxiosError) {
  log({
    name: axios.isAxiosError(error) ? error.config?.url ?? 'undefined url' : 'Not instance of AxiosError',
    data: error,
    type: 'catch'
  })
}

// Обработка ошибок
function handleResponseError(error: AxiosError<ErrorResponse>) {
  if (error.response?.status === 403) {
    console.info('403')
    const errorData: ErrorEventEmitter = { action: 'navigation', href: '/auth' }
    eventEmitter.emit('request-error', errorData)
  }

  if (error.response?.status === 401) {
    const errorData: ErrorEventEmitter = { action: 'logout' }
    eventEmitter.emit('request-error', errorData)
  }
}

export default $api
