import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';



const customizedMiddleware = getDefaultMiddleware({
	serializableCheck: false,
})

export function makeStore() {
	return configureStore({
		reducer: rootReducer,
		devTools: process.env.NODE_ENV !== 'production',
		middleware: customizedMiddleware,
	});
}

const store = makeStore();

export default store;