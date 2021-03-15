import { HashRouter as Router, Route } from 'react-router-dom';

import Header from '../Header/Header';
import AddFood from '../AddFood/AddFood';

import './App.css';

function App() {
  return (
    <div>
      <Router>
        <Header />

        <Route path="/addfood">
          <AddFood />
        </Route>
      </Router>
    </div>
  );
}

export default App;
