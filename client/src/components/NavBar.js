import { NavLink, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Button } from "../styles";

function NavBar({setUser,user}){
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }
    return(<>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="collapse navbar-collapse" id="navbarText">
    <ul className="navbar-nav mr-auto">
    <Link to={`/`}>
      <li className="nav-item active">
        <a className="nav-link" href="#">Home
           {/* <span className="sr-only">(current)</span> */}
           </a>
      </li>
      </Link>
      <li className="nav-item">
        <a className="nav-link " href="#">Create Event</a>
      </li>
      { user ? (
        <Button variant="outline" onClick={handleLogoutClick}>
          Logout
        </Button>):
        (<Link to ={`/login`}>
      <li className="nav-item">
        <a className="nav-link " href="#">Login</a>
      </li>
      </Link>)
      }
      
    </ul>
  
  </div>
    </nav>
    </>)
}


export default NavBar