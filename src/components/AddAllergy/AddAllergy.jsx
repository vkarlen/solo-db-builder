import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

function AddAllergy() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_BRANDS' });
  }, []);

  const allergyGroups = useSelector((store) => store.allergyGroupReducer);
  const ingredients = useSelector((store) => store.ingredientReducer);

  return (
    <div>
      <h2>Add New Allergy Group</h2>

      <form>
        <label>
          Group Name:
          <input type="text" />
        </label>

        <br />

        <button>Add</button>
      </form>
    </div>
  );
}

export default AddAllergy;
