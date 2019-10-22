import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { rootReducer, initRootState } from './reducers'
import rootSaga from './sagas'

// Build the middleware for intercepting and dispatching navigation actions
const sagaMiddleware = createSagaMiddleware()
let middlewares = [sagaMiddleware];

export const store = createStore(
  rootReducer,
  initRootState,
  applyMiddleware(...middlewares),
)

sagaMiddleware.run(rootSaga)
