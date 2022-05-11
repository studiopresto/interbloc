import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';



export function makeStore() {
	return configureStore({
		reducer: rootReducer,
		devTools: process.env.NODE_ENV !== 'production',
	});
}

const store = makeStore();

export default store;