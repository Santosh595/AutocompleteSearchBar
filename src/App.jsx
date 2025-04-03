import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [cache, setCache] = useState({});

  const fetchData = async () => {
    if (cache[input]) {
      console.log('CACHE RETURNED', input);
      setResults(cache[input]);
      return;
    }
    const data = await fetch('https://dummyjson.com/recipes/search?q=' + input);
    const json = await data.json();
    setResults(json?.recipes);
    setCache((prev) => ({ ...prev, [input]: json?.recipes }));
  };

  useEffect(() => {
    const timmer = setTimeout(fetchData, 400);

    return () => {
      clearTimeout(timmer);
    };
  }, [input]);

  return (
    <div className="App">
      <h1>Autocomplete Search Bar</h1>
      <div>
        <input
          type="text"
          className="search-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setShowResults(true)}
          onBlur={() => setShowResults(false)}
        />
        {showResults && (
          <div className="results-container">
            {results?.map((r) => (
              <span key={r.id} className="result">
                {r.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
