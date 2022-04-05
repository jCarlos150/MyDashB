import "./App.css";
import { Router } from "react-router-dom";

import Routes from "./routes";
import history from "./history";

import { AuthProvider } from "./myhooks/context/authContext";

const App = () => {
  return (
    <>
      <AuthProvider>
        <Router history={history}>
          {/* <Menu location={history.location.pathname} /> */}
          {/* <Navbar /> */}
          <Routes />
        </Router>
      </AuthProvider>
    </>
  );
};
export default App;
