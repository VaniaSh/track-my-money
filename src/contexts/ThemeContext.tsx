import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { useColorScheme as useNativeColorScheme } from 'react-native'
import { Colors, ColorScheme } from '@/constants/theme'

interface ThemeContextType {
  colorScheme: ColorScheme
  colors: typeof Colors.light
  toggleTheme: () => void
  setTheme: (theme: ColorScheme) => void
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemColorScheme = useNativeColorScheme()
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark')

  useEffect(() => {
    if (systemColorScheme === 'dark') {
      setColorScheme('dark')
    } else {
      setColorScheme('dark')
    }
  }, [systemColorScheme])

  const colors = Colors[colorScheme]
  const isDark = colorScheme === 'dark'

  const toggleTheme = () => {
    setColorScheme((prev: ColorScheme) => (prev === 'light' ? 'dark' : 'light'))
  }

  const setTheme = (theme: ColorScheme) => {
    setColorScheme(theme)
  }

  const value: ThemeContextType = {
    colorScheme,
    colors,
    toggleTheme,
    setTheme,
    isDark,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
