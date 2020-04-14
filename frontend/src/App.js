import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header } from "./components/global";
import { FooterContainer } from "./styled/containers";

import HomePage from "./pages/Home";
import DrivesListPage from "./pages/DrivesListPage";
import ContactsListPage from "./pages/ContactsListPage";
import RentalsListPage from "./pages/RentalsListPage";
import RentalDetailPage from "./pages/RentalDetailPage";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/drives/" component={DrivesListPage} />
        <Route exact path="/contacts/" component={ContactsListPage} />
        <Route exact path="/rentals/" component={RentalsListPage} />
        <Route exact path="/rentals/:id" component={RentalDetailPage} />
      </Switch>

      <FooterContainer />
    </Router>
  );
}

export default App;
