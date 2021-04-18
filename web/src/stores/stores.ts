import { createContext } from 'react'

import { TasksStore } from 'stores/TasksStore'
import { SettingsStore } from 'stores/SettingsStore'

export const stores = Object.freeze({
	tasksStore: new TasksStore(),
	settingsStore: new SettingsStore()
});

export const storesContext = createContext(stores)
export const StoresProvider = storesContext.Provider
