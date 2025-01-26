import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import api from './api';

function App() {
  const [greeting, setGreeting] = useState<string>('')

  useEffect(() => {
    const fetchGreeting = async () => {
      try {
        const response = await api.get('/');
        setGreeting(response.data.message);
      } catch (error) {
        console.error("Error fetching greeting:", error);
      }
    };

    fetchGreeting();
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>{greeting}</h1>
    </>
  )
}

export default App
