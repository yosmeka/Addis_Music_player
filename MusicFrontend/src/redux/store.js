import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';
import rootReducer from './slices/rootReducer'
import { rootSaga } from './sagas/rootSaga'

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const store = configureStore({
  reducer: rootReducer,
  middleware: ()=>middleware,
})

sagaMiddleware.run(rootSaga);

export default store