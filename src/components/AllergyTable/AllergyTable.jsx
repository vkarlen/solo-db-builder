import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import './AllergyTable.css';

function AllergyTable() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_GROUPS' });
    dispatch({ type: 'FETCH_INGREDIENTS' });
  }, []);

  const allergyGroups = useSelector((store) => store.allergyGroupReducer);
  const ingredients = useSelector((store) => store.ingredientReducer);

  const handleChange = (newGroup, ingredient) => {
    console.log('in Change', newGroup, ingredient);

    dispatch({
      type: 'UPDATE_GROUPING',
      payload: {
        newGroup,
        ingredient,
      },
    });
  }; // end handleChange

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
            return (
              <tr key={item.id}>
                <td>{item.ingredient}</td>

                <td>
                  <select
                    defaultValue={item.all_id}
                    onChange={(evt) => handleChange(evt.target.value, item.id)}
                  >
                    {allergyGroups.map((allergy) => {
                      return (
                        <option key={allergy.id} value={allergy.id}>
                          {allergy.description}
                        </option>
                      );
                    })}
                  </select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AllergyTable;
