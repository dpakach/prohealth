import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunkMiddleware from 'redux-thunk'

const configureStore =  () => {
    const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)
    const store = createStoreWithMiddleware(rootReducer);
    return store;
}


const store = configureStore();

export default store;
