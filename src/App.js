import React, { useEffect, lazy, Suspense } from "react";
import Header from "./component/header/header.component";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import NavBar from "./component/navbar/navbar.component";
import { fetchCollectionsStart } from "./redux/store/store.action";
import { connect } from "react-redux";
import Spinner from "./component/spinner/spinner.component";
import ErrorBoundary from "./component/error-boundary/Error-Boundary.component";
import { checkUserSession } from "./redux/user/user.action";
import { firestore } from "./firebase/firebase.utils";

const Application = lazy(() => import("./page/Application/Application.page"));
const EntertainmentPage = lazy(() =>
  import("./page/Entertainment/Entertainment.page")
);
const Movie = lazy(() => import("./page/Movie/Movie.page"));
const Book = lazy(() => import("./page/Book/Book.page"));
const CheckoutPage = lazy(() => import("./page/Checkout/CheckoutPage.page"));

const App = ({ fetchCollectionsStart, checkUserSession }) => {
  useEffect(() => {
    fetchCollectionsStart();
    checkUserSession();
  }, [fetchCollectionsStart]);

  return (
    <Container>
      <Header />
      <AppWrapper>
        <NavWrapper>
          <NavBar />
        </NavWrapper>
        <SwitchWrapper>
          <ErrorBoundary>
            <Switch>
              <Suspense fallback={<Spinner />}>
                <Route path="/entertainment" component={EntertainmentPage} />
                <Route path="/movies" component={Movie} />
                <Route path="/checkout" component={CheckoutPage} />
                <Route path="/books" component={Book} />
              </Suspense>
            </Switch>
          </ErrorBoundary>
        </SwitchWrapper>
      </AppWrapper>
    </Container>
  );
};

const NavWrapper = styled.div`
  z-index: 1;

  @media screen and (max-width: 800px) {
    display: block;
    width: 100%;
  }
`;

const SwitchWrapper = styled.div`
  height: calc(100vh - 60px);
  width: calc(100vw - 14vw);
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 800px) {
    display: block;
    width: 100%;
  }
`;

const AppWrapper = styled.div`
  display: flex;

  @media screen and (max-width: 800px) {
    display: block;
  }
`;

const Container = styled.div`
  background-color: #f3f3f4 !important;
  bottom: 0px;
`;

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(null, mapDispatchToProps)(App);
