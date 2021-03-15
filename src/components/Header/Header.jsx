import { Link } from 'react-router-dom';

import './Header.css';

function Header() {
  return (
    <div id="banner">
      <h1>Let's make some data 🐶</h1>

      <nav>
        <span>
          <Link to="/addfood" className="navigation">
            Add a Food
          </Link>
        </span>

        <span>
          <Link to="/allergies" className="navigation">
            Manage Allergy Groups
          </Link>
        </span>

        <span>
          <Link to="/food" className="navigation">
            Food List
          </Link>
        </span>
      </nav>
    </div>
  );
}

export default Header;
