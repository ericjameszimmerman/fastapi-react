import { Projects } from './components/Projects';
import { NavBar } from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App d-flex flex-column min-vh-100">
      <NavBar />
      <main className="flex-grow-1 py-3">
        <Projects />
      </main>
    </div>
  );
}

export default App;
