import { HashRouter as Router, Route } from 'react-router-dom';

import Header from '../Header/Header';
import AddFood from '../AddFood/AddFood';
import AddAllergy from '../AddAllergy/AddAllergy';
import AllergyTable from '../AllergyTable/AllergyTable';
import FoodTable from '../FoodTable/FoodTable';

import './App.css';

function App() {
  return (
    <div>
      <Router>
        <Header />

        <Route path="/addfood">
          <AddFood />
        </Route>

        <Route path="/allergies">
          <AddAllergy />
          <AllergyTable />
        </Route>

        <Route path="/food">
          <FoodTable />
        </Route>
      </Router>
    </div>
  );
}

export default App;
