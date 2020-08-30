import React, { Suspense } from "react";
import { BrowserRouter as Router, Route ,Redirect} from "react-router-dom";
import Auth from '../Auth';

const Home = React.lazy(() => import("../Home"));
const Chat = React.lazy(() => import("../Chat"));

const Routers = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Route exact path="/" component={Home} />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
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
