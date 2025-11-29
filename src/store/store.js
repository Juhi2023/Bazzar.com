import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from "@redux-devtools/extension";

import rootSaga from "./sagas/index";
import rootReducer from './reducers/index'

const sagaMiddleware = createSagaMiddleware();

const store = createStore (
        rootReducer,
        composeWithDevTools(applyMiddleware(sagaMiddleware))
    )

    
// running the sagas
sagaMiddleware.run(rootSaga);

export default store;