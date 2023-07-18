import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "./navigationBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import ShoppingListPage from "./pages/shoppingList";
import WalletPage from "./pages/walletPage";
import ShoppingOther from "./pages/shoppingOther";
import Settings from "./pages/settings";


function App() {
    return(
        <div className="App p-2">
            <Navigation/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shopping" element={<ShoppingListPage />} />
                    <Route path="/shoppingOther" element={<ShoppingOther />} />
                    <Route path="/wallet" element={<WalletPage />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;
