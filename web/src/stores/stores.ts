import { createContext } from 'react'
import TasksStore from 'stores/TasksStore'

export const stores = Object.freeze({
	tasksStore: new TasksStore()
});

export const storesContext = createContext(stores)
export const StoresProvider = storesContext.Provider
