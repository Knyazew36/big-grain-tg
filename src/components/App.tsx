import { useMemo } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { retrieveLaunchParams, useSignal, isMiniAppDark, setMiniAppHeaderColor, setMiniAppBackgroundColor } from '@telegram-apps/sdk-react'
import { AppRoot } from '@telegram-apps/telegram-ui'

import { routes } from '@/navigation/routes.tsx'
import AppProvider from '@/app/providers/AppProvider'

export function App() {
  const lp = useMemo(() => retrieveLaunchParams(), [])
  const isDark = useSignal(isMiniAppDark)

  const themeParams = {
    accent_text_color: '#6ab2f2',
    bg_color: '#010101',
    button_color: '#5288c1',
    button_text_color: '#ffffff',
    destructive_text_color: '#ec3942',
    header_bg_color: '#010101',
    hint_color: '#708499',
    link_color: '#6ab3f3',
    secondary_bg_color: '#010101',
    section_bg_color: '#010101',
    section_header_text_color: '#6ab3f3',
    subtitle_text_color: '#708499',
    text_color: '#f5f5f5'
  }

  setMiniAppHeaderColor(themeParams.header_bg_color)
  setMiniAppBackgroundColor(themeParams.bg_color)

  return (
    <AppRoot
      appearance={isDark ? 'dark' : 'light'}
      platform={['macos', 'ios'].includes(lp.tgWebAppPlatform) ? 'ios' : 'base'}
    >
      <AppProvider>
        <Routes>
          {routes.map(route => (
            <Route
              key={route.path}
              {...route}
            />
          ))}
          <Route
            path='*'
            element={<Navigate to='/' />}
          />
        </Routes>
      </AppProvider>
    </AppRoot>
  )
}
