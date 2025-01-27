

function NavBar(){

    return(<>
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  <div class="collapse navbar-collapse" id="navbarText">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link " href="#">Create Event</a>
      </li>
    </ul>
    <span className="navbar-brand nav-link">Login</span>
  </div>
    </nav>
    </>)
}


export default NavBar