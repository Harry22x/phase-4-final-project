import { Link } from "react-router-dom";
import { Button } from "../styles";

function NavBar({setUser,user}){
  function handleLogoutClick() {
    fetch("https://phase-4-final-project-ttow.onrender.com/logout", { method: "DELETE" }).then((r) => {
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
      <Link to={`/create_event`}>
      <li className="nav-item">
        <a className="nav-link " href="#">Create Event</a>
      </li>
      </Link>
      {user ? (
            <Link to={`/account`}>
            <li className="nav-item active">
              <a className="nav-link" href="#">Account
                 </a>
            </li>
            </Link>

      ):(null)}
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