import React from "react";
import {
  Switch,
  Route
} from "react-router-dom";
import EmptyLayout from "./layouts/EmptyLayout";

function App() {
  return (
    <Switch>
      <Route path="/login">
        <EmptyLayout/>
      </Route>
      <Route path="/">
        <EmptyLayout/>
      </Route>
    </Switch>
  );
}

export default App;
