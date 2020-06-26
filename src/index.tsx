import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import configure from "./store/configureStore";
import { Provider } from "react-redux";
import SiteLoader from "./components/misc/SiteLoader";

const App = React.lazy(() => import("./App"));

const store = configure();

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={SiteLoader()}>
      <App />
    </Suspense>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
