import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import { SplitButton } from "primereact/splitbutton";
import client from "../../../services/restClient";
import CommentsSection from "../../common/CommentsSection";
import ProjectLayout from "../../Layouts/ProjectLayout";

import NegotiationsPage from "../NegotiationsPage/NegotiationsPage";
import ContractsPage from "../ContractsPage/ContractsPage";

const SingleOpportunitiesPage = (props) => {
  const navigate = useNavigate();
  const urlParams = useParams();
  const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

  const [accountId, setAccountId] = useState([]);
  const [primaryContactId, setPrimaryContactId] = useState([]);

  useEffect(() => {
    //on mount
    client
      .service("opportunities")
      .get(urlParams.singleOpportunitiesId, {
        query: {
          $populate: [
            {
              path: "createdBy",
              service: "users",
              select: ["name"],
            },
            {
              path: "updatedBy",
              service: "users",
              select: ["name"],
            },
            "accountId",
            "primaryContactId",
          ],
        },
      })
      .then((res) => {
        set_entity(res || {});
        const accountId = Array.isArray(res.accountId)
          ? res.accountId.map((elem) => ({ _id: elem._id, name: elem.name }))
          : res.accountId
            ? [{ _id: res.accountId._id, name: res.accountId.name }]
            : [];
        setAccountId(accountId);
        const primaryContactId = Array.isArray(res.primaryContactId)
          ? res.primaryContactId.map((elem) => ({
              _id: elem._id,
              firstName: elem.firstName,
            }))
          : res.primaryContactId
            ? [
                {
                  _id: res.primaryContactId._id,
                  firstName: res.primaryContactId.firstName,
                },
              ]
            : [];
        setPrimaryContactId(primaryContactId);
      })
      .catch((error) => {
        console.log({ error });
        props.alert({
          title: "Opportunities",
          type: "error",
          message: error.message || "Failed get opportunities",
        });
      });
  }, [props, urlParams.singleOpportunitiesId]);

  const goBack = () => {
    navigate("/opportunities");
  };

  const toggleHelpSidebar = () => {
    setHelpSidebarVisible(!isHelpSidebarVisible);
  };

  const copyPageLink = () => {
    const currentUrl = window.location.href;

    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        props.alert({
          title: "Link Copied",
          type: "success",
          message: "Page link copied to clipboard!",
        });
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
        props.alert({
          title: "Error",
          type: "error",
          message: "Failed to copy page link.",
        });
      });
  };

  const menuItems = [
    {
      label: "Copy link",
      icon: "pi pi-copy",
      command: () => copyPageLink(),
    },
    {
      label: "Help",
      icon: "pi pi-question-circle",
      command: () => toggleHelpSidebar(),
    },
  ];

  return (
    <ProjectLayout>
      <div className="col-12 flex flex-column align-items-center">
        <div className="col-12">
          <div className="flex align-items-center justify-content-between">
            <div className="flex align-items-center">
              <Button
                className="p-button-text"
                icon="pi pi-chevron-left"
                onClick={() => goBack()}
              />
              <h3 className="m-0">Opportunities</h3>
              <SplitButton
                model={menuItems.filter(
                  (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                )}
                dropdownIcon="pi pi-ellipsis-h"
                buttonClassName="hidden"
                menuButtonClassName="ml-1 p-button-text"
              />
            </div>

            {/* <p>opportunities/{urlParams.singleOpportunitiesId}</p> */}
          </div>
          <div className="card w-full">
            <div className="grid ">
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">
                  Opportunity Name
                </label>
                <p className="m-0 ml-3">{_entity?.name}</p>
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">Probability (%)</label>
                <p className="m-0 ml-3">{Number(_entity?.probability)}</p>
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">Amount</label>
                <p className="m-0 ml-3">{Number(_entity?.amount)}</p>
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">
                  Expected Close Date
                </label>
                <p id="expectedCloseDate" className="m-0 ml-3">
                  {_entity?.expectedCloseDate}
                </p>
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">Lead Source</label>
                <p className="m-0 ml-3">{_entity?.leadSource}</p>
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">Description</label>
                <p className="m-0 ml-3">{_entity?.description}</p>
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">Closed Date</label>
                <p id="closedDate" className="m-0 ml-3">
                  {_entity?.closedDate}
                </p>
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">Account</label>
                {accountId.map((elem) => (
                  <Link key={elem._id} to={`/accounts/${elem._id}`}>
                    <div>
                      {" "}
                      <p className="text-xl text-primary">{elem.name}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">Primary Contact</label>
                {primaryContactId.map((elem) => (
                  <Link key={elem._id} to={`/contacts/${elem._id}`}>
                    <div>
                      {" "}
                      <p className="text-xl text-primary">{elem.firstName}</p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="col-12">&nbsp;</div>
            </div>
          </div>
        </div>

        <div className="col-12 mt-2">
          <TabView>
            <TabPanel
              header="Negotiations"
              leftIcon="pi pi-building-columns mr-2"
            >
              <NegotiationsPage />
            </TabPanel>

            <TabPanel header="Contracts" leftIcon="pi pi-building-columns mr-2">
              <ContractsPage />
            </TabPanel>
          </TabView>
        </div>

        <CommentsSection
          recordId={urlParams.singleOpportunitiesId}
          user={props.user}
          alert={props.alert}
          serviceName="opportunities"
        />
        <div
          id="rightsidebar"
          className={classNames(
            "overlay-auto z-1 surface-overlay shadow-2 absolute right-0 w-20rem animation-duration-150 animation-ease-in-out",
            { hidden: !isHelpSidebarVisible },
          )}
          style={{ top: "60px", height: "calc(100% - 60px)" }}
        >
          <div className="flex flex-column h-full p-4">
            <span className="text-xl font-medium text-900 mb-3">Help bar</span>
            <div className="border-2 border-dashed surface-border border-round surface-section flex-auto"></div>
          </div>
        </div>
      </div>
    </ProjectLayout>
  );
};

const mapState = (state) => {
  const { user, isLoggedIn } = state.auth;
  return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(SingleOpportunitiesPage);
