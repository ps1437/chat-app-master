import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Auth from "../Auth";
import Loader from "../loader/Loader";

const Home = React.lazy(() => import("../Home"));
const Chat = React.lazy(() => import("../Chat"));

const Routers = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Route exact path="/" component={Home} />
      </Suspense>

      <Suspense fallback={<Loader />}>
        <PrivateRoute path="/chat" component={Chat} />
      </Suspense>
    </Router>
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      Auth.getAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
          }}
        />
      )
    }
  />
);

export default Routers;
