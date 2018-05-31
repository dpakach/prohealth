import { createStore } from 'redux';
import rootReducer from '../reducers';

const configureStore =  () => {
    const store = createStore(rootReducer);
    return store;
}

const store = configureStore();

export default store;
