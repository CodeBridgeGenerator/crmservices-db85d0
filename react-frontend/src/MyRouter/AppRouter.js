import React from "react";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";

import SingleAccountsPage from "../components/app_components/AccountsPage/SingleAccountsPage";
import AccountProjectLayoutPage from "../components/app_components/AccountsPage/AccountProjectLayoutPage";
import SingleContactsPage from "../components/app_components/ContactsPage/SingleContactsPage";
import ContactProjectLayoutPage from "../components/app_components/ContactsPage/ContactProjectLayoutPage";
import SingleOpportunitiesPage from "../components/app_components/OpportunitiesPage/SingleOpportunitiesPage";
import OpportunityProjectLayoutPage from "../components/app_components/OpportunitiesPage/OpportunityProjectLayoutPage";
import SingleNegotiationsPage from "../components/app_components/NegotiationsPage/SingleNegotiationsPage";
import NegotiationProjectLayoutPage from "../components/app_components/NegotiationsPage/NegotiationProjectLayoutPage";
import SingleContractsPage from "../components/app_components/ContractsPage/SingleContractsPage";
import ContractProjectLayoutPage from "../components/app_components/ContractsPage/ContractProjectLayoutPage";
//  ~cb-add-import~

const AppRouter = () => {
  return (
    <Routes>
      {/* ~cb-add-unprotected-route~ */}
      <Route element={<ProtectedRoute redirectPath={"/login"} />}>
        
<Route path="/accounts/:singleAccountsId" exact element={<SingleAccountsPage />} />
<Route path="/accounts" exact element={<AccountProjectLayoutPage />} />
<Route path="/contacts/:singleContactsId" exact element={<SingleContactsPage />} />
<Route path="/contacts" exact element={<ContactProjectLayoutPage />} />
<Route path="/opportunities/:singleOpportunitiesId" exact element={<SingleOpportunitiesPage />} />
<Route path="/opportunities" exact element={<OpportunityProjectLayoutPage />} />
<Route path="/negotiations/:singleNegotiationsId" exact element={<SingleNegotiationsPage />} />
<Route path="/negotiations" exact element={<NegotiationProjectLayoutPage />} />
<Route path="/contracts/:singleContractsId" exact element={<SingleContractsPage />} />
<Route path="/contracts" exact element={<ContractProjectLayoutPage />} />
        {/* ~cb-add-protected-route~ */}
      </Route>
    </Routes>
  );
};

const mapState = (state) => {
  const { isLoggedIn } = state.auth;
  return { isLoggedIn };
};
const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(AppRouter);
