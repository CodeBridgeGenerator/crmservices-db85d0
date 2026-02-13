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
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
const statusArray = [
  "Draft",
  "Sent",
  "Signed",
  "Active",
  "Expired",
  "Terminated",
];
const statusOptions = statusArray.map((x) => ({ name: x, value: x }));

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

const ContractsEditDialogComponent = (props) => {
  const [_entity, set_entity] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const urlParams = useParams();
  const [opportunityId, setOpportunityId] = useState([]);
  const [accountId, setAccountId] = useState([]);

  useEffect(() => {
    set_entity(props.entity);
  }, [props.entity, props.show]);

  useEffect(() => {
    //on mount opportunities
    client
      .service("opportunities")
      .find({
        query: {
          $limit: 10000,
          $sort: { createdAt: -1 },
          _id: urlParams.singleOpportunitiesId,
        },
      })
      .then((res) => {
        setOpportunityId(
          res.data.map((e) => {
            return { name: e["name"], value: e._id };
          }),
        );
      })
      .catch((error) => {
        console.debug({ error });
        props.alert({
          title: "Opportunities",
          type: "error",
          message: error.message || "Failed get opportunities",
        });
      });
  }, []);
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

  const onSave = async () => {
    let _data = {
      opportunityId: _entity?.opportunityId?._id,
      accountId: _entity?.accountId?._id,
      contractNumber: _entity?.contractNumber,
      status: _entity?.status,
      startDate: _entity?.startDate,
      endDate: _entity?.endDate,
      contractValue: _entity?.contractValue,
      signedDate: _entity?.signedDate,
      terms: _entity?.terms,
      fileUrl: _entity?.fileUrl,
    };

    setLoading(true);
    try {
      await client.service("contracts").patch(_entity._id, _data);
      const eagerResult = await client.service("contracts").find({
        query: {
          $limit: 10000,
          _id: { $in: [_entity._id] },
          $populate: [
            {
              path: "opportunityId",
              service: "opportunities",
              select: ["name"],
            },
            {
              path: "accountId",
              service: "accounts",
              select: ["name"],
            },
          ],
        },
      });
      props.onHide();
      props.alert({
        type: "success",
        title: "Edit info",
        message: "Info contracts updated successfully",
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

  const opportunityIdOptions = opportunityId.map((elem) => ({
    name: elem.name,
    value: elem.value,
  }));
  const accountIdOptions = accountId.map((elem) => ({
    name: elem.name,
    value: elem.value,
  }));

  return (
    <Dialog
      header="Edit Contracts"
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
        role="contracts-edit-dialog-component"
      >
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="opportunityId">Opportunity:</label>
            <Dropdown
              id="opportunityId"
              value={_entity?.opportunityId?._id}
              optionLabel="name"
              optionValue="value"
              options={opportunityIdOptions}
              onChange={(e) => setValByKey("opportunityId", { _id: e.value })}
              required
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["opportunityId"]) && (
              <p className="m-0" key="error-opportunityId">
                {error["opportunityId"]}
              </p>
            )}
          </small>
        </div>
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
            <label htmlFor="contractNumber">Contract Number:</label>
            <InputText
              id="contractNumber"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.contractNumber}
              onChange={(e) => setValByKey("contractNumber", e.target.value)}
              required
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["contractNumber"]) && (
              <p className="m-0" key="error-contractNumber">
                {error["contractNumber"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="status">Status:</label>
            <Dropdown
              id="status"
              value={_entity?.status}
              options={statusOptions}
              optionLabel="name"
              optionValue="value"
              onChange={(e) => setValByKey("status", e.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["status"]) && (
              <p className="m-0" key="error-status">
                {error["status"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="startDate">Start Date:</label>
            <Calendar
              id="startDate"
              value={_entity?.startDate ? new Date(_entity?.startDate) : null}
              onChange={(e) => setValByKey("startDate", new Date(e.value))}
              showIcon
              showButtonBar
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["startDate"]) && (
              <p className="m-0" key="error-startDate">
                {error["startDate"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="endDate">End Date:</label>
            <Calendar
              id="endDate"
              value={_entity?.endDate ? new Date(_entity?.endDate) : null}
              onChange={(e) => setValByKey("endDate", new Date(e.value))}
              showIcon
              showButtonBar
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["endDate"]) && (
              <p className="m-0" key="error-endDate">
                {error["endDate"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="contractValue">Contract Value:</label>
            <InputNumber
              id="contractValue"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.contractValue}
              onChange={(e) => setValByKey("contractValue", e.value)}
              useGrouping={false}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["contractValue"]) && (
              <p className="m-0" key="error-contractValue">
                {error["contractValue"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="signedDate">Signed Date:</label>
            <Calendar
              id="signedDate"
              value={_entity?.signedDate ? new Date(_entity?.signedDate) : null}
              onChange={(e) => setValByKey("signedDate", new Date(e.value))}
              showIcon
              showButtonBar
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["signedDate"]) && (
              <p className="m-0" key="error-signedDate">
                {error["signedDate"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="terms">Terms:</label>
            <InputTextarea
              id="terms"
              rows={5}
              cols={30}
              value={_entity?.terms}
              onChange={(e) => setValByKey("terms", e.target.value)}
              autoResize
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["terms"]) && (
              <p className="m-0" key="error-terms">
                {error["terms"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="fileUrl">File URL:</label>
            <InputText
              id="fileUrl"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.fileUrl}
              onChange={(e) => setValByKey("fileUrl", e.target.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["fileUrl"]) && (
              <p className="m-0" key="error-fileUrl">
                {error["fileUrl"]}
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

export default connect(mapState, mapDispatch)(ContractsEditDialogComponent);
