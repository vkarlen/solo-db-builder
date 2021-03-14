import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import axios from 'axios';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';

import App from './components/App/App';

/*** SAGAS ***/
function* rootSaga() {
  yield takeEvery('FETCH_BRANDS', fetchBrands);
  yield takeEvery('ADD_FOOD', addFood);
}

function* fetchBrands() {
  try {
    const brands = yield axios.get('/api/food/brands');

    yield put({
      type: 'SET_BRANDS',
      payload: brands.data,
    });
  } catch (error) {
    console.log('Error in fetchBrands');
  }
} // end fetchBrands

function* addFood(action) {
  console.log('addFood', action.payload);

  try {
    yield axios.post('/api/food/add', action.payload);
  } catch (error) {
    console.log('Error in addFood', error);
  }
}

/*** REDUCERS ***/
const brandReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_BRANDS':
      return action.payload;
    default:
      return state;
  }
};

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({
    brandReducer,
  }),
  applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
