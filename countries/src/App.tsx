import { FC } from "react";
import "./App.css";
import { CountriesList } from "./List/Countries";

export const App: FC = () => {
  return (
    <div className="App">
      <CountriesList />
    </div>
  );
};

App.displayName = "APP";

export default App;
