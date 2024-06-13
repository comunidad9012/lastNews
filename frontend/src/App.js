import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import News from './components/News';
import NewsDetail from './components/NewsDetail';
import Create from './components/CreateNews';
function App() {
  return (
    <div className="App">
      <Router>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/news/showNews">Inicio</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon" /></button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/news/editor">Crear noticia</Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Buscar noticia" aria-label="Search"/>
              <button className="btn btn-outline-success" type="submit">Buscar</button>{/* Seguir con el backend */}
            </form>
          </div>
        </div>
      </nav>
      <Routes>
            <Route path='/news/showNews' element={<News/>} />
            <Route path='/news/viewNew/:id' element={<NewsDetail/>} />
            <Route path='/news/editor' element={<Create/>} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;

