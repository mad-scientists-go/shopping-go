import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import adminUser from './adminUser'
import inStoreUsers from './inStoreUsers';
import adminOrders from './adminOrders';
const reducer = combineReducers({adminUser, inStoreUsers, adminOrders})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './adminUser'
export * from './inStoreUsers'
export * from './adminOrders'