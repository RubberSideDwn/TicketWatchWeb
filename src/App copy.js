import * as React from 'react';
// import AddVehicle from './components/AddVehicle/AddVehicle';
import Search from './components/Search/Search';
import { BrowserRouter as Router } from "react-router-dom";
import './App.scss';

export default function App() {
return (
<Router>
    <Search />
</Router>
);
}