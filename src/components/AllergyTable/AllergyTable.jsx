import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import './AllergyTable.css';

function AllergyTable() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_GROUPS' });
    dispatch({ type: 'FETCH_INGREDIENTS' });
  }, []);

  const allergyGroups = useSelector((store) => store.allergyGroupReducer);
  const ingredients = useSelector((store) => store.ingredientReducer);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>Allergy Group</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((item) => {
            console.log(item);
            return (
              <tr key={item.id}>
                <td>{item.ingredient}</td>
                <td>{item.group}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AllergyTable;
