import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import form from './component/form'

function App() {
  return (
    <BrowserRouter >
      <div className="App">
        <Route exact path='/' component={form} />
      </div>
    </BrowserRouter>
  );
}

export default App;
