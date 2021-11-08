import React from 'react';
import './App.css';
import Header from "../header/header"
import { Route, Routes } from 'react-router-dom';
import HomePage from "../pages/homePage";
import CrudPage from "../pages/crudPage";


function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route
                    path="/"
                    element={<HomePage />}
                    exact />
                <Route
                    path="/crud"
                    element={<CrudPage />} />
            </Routes>
        </div>
    );
}

export default App;
