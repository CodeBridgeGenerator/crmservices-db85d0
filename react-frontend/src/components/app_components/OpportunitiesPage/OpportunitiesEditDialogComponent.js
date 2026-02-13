/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
const stageArray = [
  "Prospecting",
  "Qualification",
  "Proposal",
  "Negotiation",
  "Closed Won",
  "Closed Lost",
];
const stageOptions = stageArray.map((x) => ({ name: x, value: x }));

const getSchemaValidationErrorsStrings = (errorObj) => {
  let errMsg = {};
  for (const key in errorObj.errors) {
    if (Object.hasOwnProperty.call(errorObj.errors, key)) {
      const element = errorObj.errors[key];
      if (element?.message) {
        errMsg.push(element.message);
      }
    }
  }
  return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const OpportunitiesEditDialogComponent = (props) => {
  const [_entity, set_entity] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const urlParams = useParams();
  const [accountId, setAccountId] = useState([]);
  const [primaryContactId, setPrimaryContactId] = useState([]);

  useEffect(() => {
    set_entity(props.entity);
  }, [props.entity, props.show]);

  useEffect(() => {
    //on mount accounts
    client
      .service("accounts")
      .find({
        query: {
          $limit: 10000,
          $sort: { createdAt: -1 },
          _id: urlParams.singleAccountsId,
        },
      })
      .then((res) => {
        setAccountId(
          res.data.map((e) => {
            return { name: e["name"], value: e._id };
          }),
        );
      })
      .catch((error) => {
        console.debug({ error });
        props.alert({
          title: "Accounts",
          type: "error",
          message: error.message || "Failed get accounts",
        });
      });
  }, []);
  useEffect(() => {
    //on mount contacts
    client
      .service("contacts")
      .find({
        query: {
          $limit: 10000,
          $sort: { createdAt: -1 },
          _id: urlParams.singleContactsId,
        },
      })
      .then((res) => {
        setPrimaryContactId(
          res.data.map((e) => {
            return { name: e["firstName,lastName"], value: e._id };
          }),
        );
      })
      .catch((error) => {
        console.debug({ error });
        props.alert({
          title: "Contacts",
          type: "error",
          message: error.message || "Failed get contacts",
        });
      });
  }, []);

  const onSave = async () => {
    let _data = {
      accountId: _entity?.accountId?._id,
      primaryContactId: _entity?.primaryContactId?._id,
      name: _entity?.name,
      stage: _entity?.stage,
      probability: _entity?.probability,
      amount: _entity?.amount,
      expectedCloseDate: _entity?.expectedCloseDate,
      leadSource: _entity?.leadSource,
      description: _entity?.description,
      closedDate: _entity?.closedDate,
    };

    setLoading(true);
    try {
      await client.service("opportunities").patch(_entity._id, _data);
      const eagerResult = await client.service("opportunities").find({
        query: {
          $limit: 10000,
          _id: { $in: [_entity._id] },
          $populate: [
            {
              path: "accountId",
              service: "accounts",
              select: ["name"],
            },
            {
              path: "primaryContactId",
              service: "contacts",
              select: ["firstName", "lastName"],
            },
          ],
        },
      });
      props.onHide();
      props.alert({
        type: "success",
        title: "Edit info",
        message: "Info opportunities updated successfully",
      });
      props.onEditResult(eagerResult.data[0]);
    } catch (error) {
      console.debug("error", error);
      setError(
        getSchemaValidationErrorsStrings(error) || "Failed to update info",
      );
      props.alert({
        type: "error",
        title: "Edit info",
        message: "Failed to update info",
      });
    }
    setLoading(false);
  };

  const renderFooter = () => (
    <div className="flex justify-content-end">
      <Button
        label="save"
        className="p-button-text no-focus-effect"
        onClick={onSave}
        loading={loading}
      />
      <Button
        label="close"
        className="p-button-text no-focus-effect p-button-secondary"
        onClick={props.onHide}
      />
    </div>
  );

  const setValByKey = (key, val) => {
    let new_entity = { ..._entity, [key]: val };
    set_entity(new_entity);
    setError({});
  };

  const accountIdOptions = accountId.map((elem) => ({
    name: elem.name,
    value: elem.value,
  }));
  const primaryContactIdOptions = primaryContactId.map((elem) => ({
    name: elem.name,
    value: elem.value,
  }));

  return (
    <Dialog
      header="Edit Opportunities"
      visible={props.show}
      closable={false}
      onHide={props.onHide}
      modal
      style={{ width: "40vw" }}
      className="min-w-max scalein animation-ease-in-out animation-duration-1000"
      footer={renderFooter()}
      resizable={false}
    >
      <div
        className="grid p-fluid overflow-y-auto"
        style={{ maxWidth: "55vw" }}
        role="opportunities-edit-dialog-component"
      >
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="accountId">Account:</label>
            <Dropdown
              id="accountId"
              value={_entity?.accountId?._id}
              optionLabel="name"
              optionValue="value"
              options={accountIdOptions}
              onChange={(e) => setValByKey("accountId", { _id: e.value })}
              required
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["accountId"]) && (
              <p className="m-0" key="error-accountId">
                {error["accountId"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="primaryContactId">Primary Contact:</label>
            <Dropdown
              id="primaryContactId"
              value={_entity?.primaryContactId?._id}
              optionLabel="name"
              optionValue="value"
              options={primaryContactIdOptions}
              onChange={(e) =>
                setValByKey("primaryContactId", { _id: e.value })
              }
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["primaryContactId"]) && (
              <p className="m-0" key="error-primaryContactId">
                {error["primaryContactId"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="name">Opportunity Name:</label>
            <InputText
              id="name"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.name}
              onChange={(e) => setValByKey("name", e.target.value)}
              required
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["name"]) && (
              <p className="m-0" key="error-name">
                {error["name"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="stage">Stage:</label>
            <Dropdown
              id="stage"
              value={_entity?.stage}
              options={stageOptions}
              optionLabel="name"
              optionValue="value"
              onChange={(e) => setValByKey("stage", e.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["stage"]) && (
              <p className="m-0" key="error-stage">
                {error["stage"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="probability">Probability (%):</label>
            <InputNumber
              id="probability"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.probability}
              onChange={(e) => setValByKey("probability", e.value)}
              useGrouping={false}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["probability"]) && (
              <p className="m-0" key="error-probability">
                {error["probability"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="amount">Amount:</label>
            <InputNumber
              id="amount"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.amount}
              onChange={(e) => setValByKey("amount", e.value)}
              useGrouping={false}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["amount"]) && (
              <p className="m-0" key="error-amount">
                {error["amount"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="expectedCloseDate">Expected Close Date:</label>
            <Calendar
              id="expectedCloseDate"
              value={
                _entity?.expectedCloseDate
                  ? new Date(_entity?.expectedCloseDate)
                  : null
              }
              onChange={(e) =>
                setValByKey("expectedCloseDate", new Date(e.value))
              }
              showIcon
              showButtonBar
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["expectedCloseDate"]) && (
              <p className="m-0" key="error-expectedCloseDate">
                {error["expectedCloseDate"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="leadSource">Lead Source:</label>
            <InputText
              id="leadSource"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.leadSource}
              onChange={(e) => setValByKey("leadSource", e.target.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["leadSource"]) && (
              <p className="m-0" key="error-leadSource">
                {error["leadSource"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="description">Description:</label>
            <InputTextarea
              id="description"
              rows={5}
              cols={30}
              value={_entity?.description}
              onChange={(e) => setValByKey("description", e.target.value)}
              autoResize
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["description"]) && (
              <p className="m-0" key="error-description">
                {error["description"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="closedDate">Closed Date:</label>
            <Calendar
              id="closedDate"
              value={_entity?.closedDate ? new Date(_entity?.closedDate) : null}
              onChange={(e) => setValByKey("closedDate", new Date(e.value))}
              showIcon
              showButtonBar
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["closedDate"]) && (
              <p className="m-0" key="error-closedDate">
                {error["closedDate"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12">&nbsp;</div>
        <small className="p-error">
          {Array.isArray(Object.keys(error))
            ? Object.keys(error).map((e, i) => (
                <p className="m-0" key={i}>
                  {e}: {error[e]}
                </p>
              ))
            : error}
        </small>
      </div>
    </Dialog>
  );
};

const mapState = (state) => {
  const { user } = state.auth;
  return { user };
};
const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(OpportunitiesEditDialogComponent);
