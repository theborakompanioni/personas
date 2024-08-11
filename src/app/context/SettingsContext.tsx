'use client'

import { Reducer } from 'react'
import {
  ProviderProps,
  createContext,
  useReducer,
  useEffect,
  useContext,
} from 'react'

const localStorageKey = () => 'app'

export interface AppSettings {
  dev: boolean
  theme: string
  [key: string]: any
}

interface AppSettingsEntry {
  settings: AppSettings
  dispatch: (value: Partial<AppSettings>) => void
}

const SettingsContext = createContext<AppSettingsEntry | undefined>(undefined)

const settingsReducer = (
  oldSettings: AppSettings,
  action: Partial<AppSettings>,
) => {
  const { ...newSettings } = action

  return {
    ...oldSettings,
    ...newSettings,
  }
}

interface SettingsProviderProps {
  defaultValues: AppSettings
}

const SettingsProvider = ({
  value: { defaultValues },
  children,
}: ProviderProps<SettingsProviderProps>) => {
  const [settings, dispatch] = useReducer<
    Reducer<AppSettings, Partial<AppSettings>>
  >(
    settingsReducer,
    Object.assign(
      {},
      defaultValues,
      JSON.parse(
        typeof window !== 'undefined'
          ? localStorage.getItem(localStorageKey()) || '{}'
          : '{}',
      ),
    ),
  )

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(localStorageKey(), JSON.stringify(settings))
    }
  }, [settings])

  return (
    <SettingsContext.Provider value={{ settings, dispatch }}>
      {children}
    </SettingsContext.Provider>
  )
}

const useSettings = () => {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context.settings
}

const useSettingsDispatch = () => {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error(
      'useSettingsDispatch must be used within a SettingsProvider',
    )
  }
  return context.dispatch
}

export { SettingsProvider, useSettings, useSettingsDispatch }
