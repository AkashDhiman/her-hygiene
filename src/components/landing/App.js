import React, { useRef, useEffect } from "react";
import ScrollReveal from "./utils/ScrollReveal";
import "./assets/scss/style.scss";
import { useLocation } from "@reach/router";
import ReactGA from "react-ga";

// Layouts
import LayoutDefault from "./layouts/LayoutDefault";

// Views
import Home from "./views/Home";

// Initialize Google Analytics
ReactGA.initialize(process.env.REACT_APP_GA_CODE);

const trackPage = (page) => {
  ReactGA.set({ page });
  ReactGA.pageview(page);
};
const App = () => {
  const childRef = useRef();
  let location = useLocation();

  useEffect(() => {
    const page = location.pathname;
    document.body.classList.add("is-loaded");
    childRef.current.init();
    trackPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  return (
    <ScrollReveal
      ref={childRef}
      children={() => (
        <LayoutDefault>
          <Home />
        </LayoutDefault>
      )}
    />
  );
};

export default App;
