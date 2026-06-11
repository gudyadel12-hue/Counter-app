import { useState, useEffect } from "react";

function App() {
  const [counters, setCounters] = useState(() => {
    const saved = localStorage.getItem("counters");
    return saved ? JSON.parse(saved) : [0, 0, 0];
  });

  useEffect(() => {
    localStorage.setItem("counters", JSON.stringify(counters));
  }, [counters]);

  const addNewCounter = () => {
    setCounters((prev) => [...prev, 0]);
  };

  
  const deleteCounter = (indexToDelete) => {
    setCounters((prev) => prev.filter((_, index) => index !== indexToDelete));
  };
  const updateCounter = (index, delta) => {
    setCounters((prev) =>
      prev.map((val, i) => (i === index ? val + delta : val))
    );
  };

  
  const resetCounter = (index) => {
    setCounters((prev) => prev.map((val, i) => (i === index ? 0 : val)));
  };

 
  const incrementAll = () => {
    setCounters((prev) => prev.map((v) => v + 1));
  };

  
  const resetAll = () => {
    setCounters((prev) => prev.map(() => 0));
  };

 
  const total = counters.reduce((sum, v) => sum + v, 0);
  const average = counters.length > 0 ? (total / counters.length).toFixed(1) : "0.0";

  return (
    <div className="app-container">
      <header className="app-header">
        <h1> Advanced Multi-Counter Dashboard</h1>
        
      </header>

      {/* Analytics Panel */}
      <section className="stats-grid">
        <div className="stat-card total-card">
          <p className="stat-label">Total Absolute Sum</p>
          <p className="stat-value">{total}</p>
        </div>
        <div className="stat-card average-card">
          <p className="stat-label">Mathematical Average</p>
          <p className="stat-value">{average}</p>
        </div>
      </section>

      {/* Main Global Action Dashboard */}
      <div className="global-controls">
        <button className="btn btn-primary" onClick={addNewCounter}>
          ➕ Add New Counter
        </button>
        <button className="btn btn-success" onClick={incrementAll}>
          ⚡ Increment All (+1)
        </button>
        <button className="btn btn-danger" onClick={resetAll}>
          🔄 Reset All values
        </button>
      </div>

      {/* Counters Grid View */}
      {counters.length === 0 ? (
        <p className="empty-state">No counters remaining. Click "Add New Counter" to begin!</p>
      ) : (
        <main className="counters-grid">
          {counters.map((count, index) => (
            <article key={index} className="counter-card">
              <div className="counter-card-header">
                <h3 className="counter-title">Counter {index + 1}</h3>
                <button 
                  className="btn-delete-single" 
                  onClick={() => deleteCounter(index)}
                  title="Delete Counter"
                >
                  🗑️
                </button>
              </div>
              
              <p className="counter-value">{count}</p>
              
              <div className="counter-actions">
                <button 
                  className="btn-action btn-add" 
                  onClick={() => updateCounter(index, 1)}
                >
                  +
                </button>
                <button 
                  className="btn-action btn-subtract" 
                  onClick={() => updateCounter(index, -1)}
                >
                  -
                </button>
                <button 
                  className="btn-action btn-reset" 
                  onClick={() => resetCounter(index)}
                >
                  Clear
                </button>
              </div>
            </article>
          ))}
        </main>
      )}
    </div>
  );
}

export default App;