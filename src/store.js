import { createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import problems from './reducers/problemsReducer';
import problemFormData from './reducers/problemFormData';

const reducers = combineReducers({
  problems, problemFormData
})

const middleware = [thunk]

export default createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(...middleware)
)