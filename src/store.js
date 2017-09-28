import { createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import problemsReducer from './reducers/problemsReducer';


const reducers = combineReducers({
  problems: problemsReducer
})

const middleware = [thunk]

export default createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(...middleware)
)