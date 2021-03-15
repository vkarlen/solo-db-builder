import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import FoodList from '../FoodList/FoodList';

import './FoodTable.css';

function FoodTable() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_FOOD' });
  }, []);

  const foodList = useSelector((store) => store.foodReducer);

  return (
    <div>
      <h2>All Foods Added</h2>

      <table id="foodTable">
        <thead>
          <tr>
            <th>Brand</th>
            <th>Name</th>
            <th>Ingredients</th>
          </tr>
        </thead>
        <tbody>
          {foodList.map((food) => {
            return <FoodList food={food} key={food.id} />;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default FoodTable;
