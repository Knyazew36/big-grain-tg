import { Page } from '@/components/Page'
import InputPhone from '@/shared/ui/input-phone/ui/InputPhone'
import PageHeader from '@/shared/ui/page-header/ui/PageHeader'
import ButtonAction from '@/shared/button-action/ButtonAction'
import { hapticFeedback } from '@telegram-apps/sdk-react'
import { useNavigate } from 'react-router-dom'
import React, { useState, useMemo } from 'react'
import { toast } from 'sonner'
import { useBottomSheetStore } from '@/shared/bottom-sheet/model/store.bottom-sheet'
import { allowedPhoneService } from '@/entitites/auth/auth.api'

const AddUserPage = () => {
  const navigate = useNavigate()
  const [phones, setPhones] = useState<string[]>([''])
  const [isLoading, setIsLoading] = useState(false)
  const { open } = useBottomSheetStore()

  // Валидация телефонов
  const phoneValidation = useMemo(() => {
    const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/
    return phones.map(phone => ({
      value: phone,
      isValid: phone.trim() === '' || phoneRegex.test(phone),
      isEmpty: phone.trim() === ''
    }))
  }, [phones])

  const hasValidPhones = phoneValidation.some(phone => !phone.isEmpty && phone.isValid)
  const hasInvalidPhones = phoneValidation.some(phone => !phone.isEmpty && !phone.isValid)

  const addPhoneField = () => {
    setPhones(prev => [...prev, ''])
    hapticFeedback.impactOccurred('light')
  }

  const removePhoneField = (index: number) => {
    if (phones.length > 1) {
      setPhones(prev => prev.filter((_, i) => i !== index))
      hapticFeedback.impactOccurred('light')
    }
  }

  const updatePhone = (index: number, value: string) => {
    setPhones(prev => prev.map((phone, i) => (i === index ? value : phone)))
  }

  const handleSubmit = async () => {
    const validPhones = phones.filter(phone => phone.trim() !== '')

    if (validPhones.length === 0) {
      toast.error('Добавьте хотя бы один телефон')
      hapticFeedback.notificationOccurred('error')
      return
    }

    if (hasInvalidPhones) {
      toast.error('Проверьте правильность ввода телефонов')
      hapticFeedback.notificationOccurred('error')
      return
    }

    try {
      setIsLoading(true)

      // Создаем отдельного пользователя для каждого телефона
      const createPromises = validPhones.map(phone => {
        const digits = phone.replace(/\D/g, '')
        const formattedPhone = '+7' + digits.slice(-10)
        return allowedPhoneService({ phone: formattedPhone })
      })

      await Promise.all(createPromises)

      open({
        isOpen: true,
        description:
          'Сотрудникам необходимо будет пройти авторизацию в боте, после чего они будут доступны в списке сотрудников. Вы можете добавить сотрудников еще или продолжить работу.',
        title: 'Сотрудники успешно добавлены'
      })

      navigate(-1)
    } catch (error) {
      toast.error('Ошибка при добавлении сотрудников')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setPhones([''])
    hapticFeedback.impactOccurred('light')
  }

  return (
    <Page back>
      <PageHeader title='Добавить сотрудников' />

      <div className='flex flex-col gap-4 pb-20'>
        {/* Телефоны */}
        <div className='flex flex-col gap-3'>
          <div className='flex items-center justify-between'>
            <label className='sm:mt-2.5 inline-block text-sm text-gray-500 dark:text-neutral-500'>
              Телефоны сотрудников
            </label>
            <span className='text-xs text-gray-400'>
              {phones.filter(p => p.trim() !== '').length} из {phones.length}
            </span>
          </div>

          {phones.map((phone, index) => (
            <div
              key={index}
              className='flex gap-2 items-start'
            >
              <div className='flex-1'>
                <InputPhone
                  placeholder='+7 (999) 999-99-99'
                  value={phone}
                  onChange={value => updatePhone(index, value)}
                  error={
                    phoneValidation[index]?.isEmpty
                      ? undefined
                      : phoneValidation[index]?.isValid
                      ? undefined
                      : 'Неверный формат телефона'
                  }
                />
              </div>
              {phones.length > 1 && (
                <button
                  type='button'
                  onClick={() => removePhoneField(index)}
                  className='hs-tooltip-toggle size-12 inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-red-600 hover:bg-red-100  disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-red-100 dark:text-red-500 dark:hover:bg-red-500/20 bg-red-500/20 dark:focus:bg-red-500/20'
                >
                  <svg
                    className='shrink-0 size-4'
                    xmlns='http://www.w3.org/2000/svg'
                    width={24}
                    height={24}
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth={2}
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path d='M3 6h18' />
                    <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' />
                    <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' />
                    <line
                      x1={10}
                      x2={10}
                      y1={11}
                      y2={17}
                    />
                    <line
                      x1={14}
                      x2={14}
                      y1={11}
                      y2={17}
                    />
                  </svg>
                </button>
              )}
            </div>
          ))}

          <button
            onClick={addPhoneField}
            type='button'
            className='w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none'
          >
            Добавить сотрудника
          </button>

          <p className='mt-2 text-sm text-gray-500 dark:text-neutral-500 bg-gray-50 dark:bg-neutral-800 p-3 rounded-lg'>
            💡 Подсказка: Каждый телефон создаст отдельного сотрудника. Формат: +7 (999) 999-99-99
          </p>
        </div>
      </div>

      <ButtonAction
        onSuccessClick={handleSubmit}
        onCancelClick={handleCancel}
        isLoading={isLoading}
        disabledSuccess={!hasValidPhones || hasInvalidPhones}
      />
    </Page>
  )
}

export default AddUserPage
