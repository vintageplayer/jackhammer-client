import {applyMiddleware, createStore} from "redux"

//import logger from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"
import storage from 'redux-persist/lib/storage'
import reducer from "../Reducers"
import {createLogger} from 'redux-logger'
import {persistStore, persistReducer} from 'redux-persist'

const middleware = applyMiddleware(promise(), thunk, createLogger())
const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, reducer)

export default() => {
  let store = createStore(persistedReducer, middleware)
  let persistor = persistStore(store)
  return {store, persistor,}
}
