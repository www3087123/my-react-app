import { configureStore, combineReducers } from "@reduxjs/toolkit"
import articleSlice from "./article/slice"
const rootReducers = combineReducers({
    article: articleSlice
})

const store = configureStore({
    reducer: rootReducers,
    middleware: (middleware) => middleware(),
    devTools: true
})

export default store