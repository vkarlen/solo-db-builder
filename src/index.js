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

/*** ---- SAGAS ---- ***/
function* rootSaga() {
  yield takeEvery('ADD_FOOD', addFood);
  yield takeEvery('ADD_GROUP', addAllergyGroup);
  yield takeEvery('FETCH_BRANDS', fetchBrands);
  yield takeEvery('FETCH_GROUPS', fetchGroups);
  yield takeEvery('FETCH_INGREDIENTS', fetchIngredients);
  yield takeEvery('FETCH_FOOD', fetchFood);
  yield takeEvery('UPDATE_GROUPING', updateGrouping);
}

function* addFood(action) {
  //console.log('addFood', action.payload);

  try {
    yield axios.post('/api/food/add', action.payload);
    alert('Success!');
  } catch (error) {
    console.log('Error in addFood', error);
  }
} // end addFood

function* addAllergyGroup(action) {
  try {
    console.log('in saga');
    yield axios.post('/api/food/allergy/add', action.payload);

    yield put({
      type: 'FETCH_GROUPS',
    });
  } catch (error) {
    console.log('Error in addAllergyGroup', error);
  }
} // end addAllergyGroup

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

function* fetchGroups() {
  try {
    const groups = yield axios.get('/api/food/allergy');

    yield put({
      type: 'SET_GROUPS',
      payload: groups.data,
    });
  } catch (error) {
    console.log('Error in fetchGroups');
  }
} // end fetchGroups

function* fetchIngredients() {
  try {
    const ingredients = yield axios.get('/api/food/ingredients');

    yield put({
      type: 'SET_INGREDIENTS',
      payload: ingredients.data,
    });
  } catch (error) {
    console.log('Error in fetchIngredients');
  }
} // end fetchIngredients

function* fetchFood() {
  try {
    const food = yield axios.get('/api/food/');

    yield put({
      type: 'SET_FOOD_LIST',
      payload: food.data,
    });
  } catch (error) {
    console.log('Error in fetchFoods', error);
  }
} // end fetchFood

function* updateGrouping(action) {
  console.log('updateGrouping', action.payload);

  try {
    yield axios.put('/api/food/update', action.payload);

    yield put({
      type: 'FETCH_INGREDIENTS',
    });
  } catch (error) {
    console.log('Error in changeGrouping', error);
  }
} // end changeGrouping

/*** ---- REDUCERS ---- ***/
const brandReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_BRANDS':
      return action.payload;
    default:
      return state;
  }
};

const ingredientReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_INGREDIENTS':
      return action.payload;
    default:
      return state;
  }
};

const allergyGroupReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_GROUPS':
      return action.payload;
    default:
      return state;
  }
};

const foodReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_FOOD_LIST':
      return action.payload;
    default:
      return state;
  }
};

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({
    brandReducer,
    ingredientReducer,
    allergyGroupReducer,
    foodReducer,
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
