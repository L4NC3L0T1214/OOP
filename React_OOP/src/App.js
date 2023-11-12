import React from 'react';
import './App.css';
import Home from './Home'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Bisection from './components/Bisection'
import Secant from './components/Secant'
import FalsePosition from './components/FalsePosition'

import ReactDOM from "react-dom";
import Sidebar from './Sidebar';
import OnePointIteration from './components/OnePointIteration';
import NewtonRaphson from './components/NewtonRaphson';

import Cramer from './components/CramerRule'
import GuessElim from './components/GaussElim';
import GuessJordan from './components/GaussJordan';
import MatrixInversion from './components/MatrixInversion';
import LUDecomposition from './components/LUDecomposition';
import CholeskyDecomposition from './components/CholeskyDecomposition';
// 
import Jacobi from './components/Jacobi';
import GuessSeidel from './components/GaussSeidel';
import Langrange from './components/Lagrange';
import NewtonDevided from './components/NewtonDivided';
import Regression from './components/Regression';
import RegressionMulti from './components/RegressionMulti';


function App() {
  return (
    <div className='App'>
      <BrowserRouter>
      <Sidebar />
      <Routes>
      <Route path="/" exact element={<Home/>}/>
      <Route path="/Bisection" element={<Bisection/>}/>
      <Route path="/FalsePosition" element={<FalsePosition/>}/>
      <Route path="/OnePointIteration" element={<OnePointIteration/>}/>
      <Route path="/NewtonRaphson" element={<NewtonRaphson/>}/>
      <Route path="/Secant" element={<Secant/>}/>
      <Route path="/Cramer" element={<Cramer/>} />
      <Route path="/GuessElim" element={<GuessElim />}/>
      <Route path="/GuessJordan" element={<GuessJordan />}/>
      <Route path="/MatrixInversion" element={<MatrixInversion />}/>
      <Route path="/LUDecomposition" element={<LUDecomposition />}/>
      <Route path="/CholeskyDecomposition" element={<CholeskyDecomposition />}/>
      <Route path="/Jacobi" element={<Jacobi />}/>
      <Route path="/GuessSeidel" element={<GuessSeidel />}/>
      <Route path="/Lagrange" element={<Langrange/>}/>
      <Route path="/NewtonDivided" element={<NewtonDevided/>}/>
      <Route path="/Regression" element={<Regression/>}/>
      <Route path="/RegressionMulti" element={<RegressionMulti/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

ReactDOM.render(<App />, document.getElementById("root"));