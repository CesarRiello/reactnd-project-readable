import React from 'react';

const Nav = () => (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <a className="navbar-brand" href="#">React Redux</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="./">Home <span className="sr-only">(current)</span></a>
          </li>
 
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Categorias</a>
            <div className="dropdown-menu" aria-labelledby="dropdown01">
              <a className="dropdown-item" href="#">Categoria 1</a>
              <a className="dropdown-item" href="#">Categoria 2</a>
              <a className="dropdown-item" href="#">Categoria 3</a>
            </div>
          </li>
        </ul>
        
      </div>
    </nav>
)
export default Nav