import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunkMiddleware from 'redux-thunk'
import api from '../utils/api';


const configureStore =  () => {
    const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, api)(createStore)
    const store = createStoreWithMiddleware(rootReducer);
    return store;
}


const store = configureStore();

export default store;
