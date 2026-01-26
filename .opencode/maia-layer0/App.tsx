import { Counter } from './components/Counter';
import './App.css';

function App() {
  return (
    <div className="app">
      <header>
        <h1>🚀 MAIA App</h1>
        <p>Zero-setup React development</p>
      </header>
      <main>
        <Counter initialValue={0} step={1} />
      </main>
      <footer>
        <p>Powered by MAIA Droids</p>
      </footer>
    </div>
  );
}

export default App;
