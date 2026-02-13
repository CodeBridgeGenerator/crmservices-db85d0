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
import { InputTextarea } from "primereact/inputtextarea";
const statusArray = ["Active", "Inactive"];
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

const ContactsEditDialogComponent = (props) => {
  const [_entity, set_entity] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const urlParams = useParams();
  const [accountId, setAccountId] = useState([]);

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

  const onSave = async () => {
    let _data = {
      accountId: _entity?.accountId?._id,
      firstName: _entity?.firstName,
      lastName: _entity?.lastName,
      jobTitle: _entity?.jobTitle,
      email: _entity?.email,
      phone: _entity?.phone,
      status: _entity?.status,
      notes: _entity?.notes,
    };

    setLoading(true);
    try {
      await client.service("contacts").patch(_entity._id, _data);
      const eagerResult = await client.service("contacts").find({
        query: {
          $limit: 10000,
          _id: { $in: [_entity._id] },
          $populate: [
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
        message: "Info contacts updated successfully",
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

  return (
    <Dialog
      header="Edit Contacts"
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
        role="contacts-edit-dialog-component"
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
            <label htmlFor="firstName">First Name:</label>
            <InputText
              id="firstName"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.firstName}
              onChange={(e) => setValByKey("firstName", e.target.value)}
              required
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["firstName"]) && (
              <p className="m-0" key="error-firstName">
                {error["firstName"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="lastName">Last Name:</label>
            <InputText
              id="lastName"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.lastName}
              onChange={(e) => setValByKey("lastName", e.target.value)}
              required
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["lastName"]) && (
              <p className="m-0" key="error-lastName">
                {error["lastName"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="jobTitle">Job Title:</label>
            <InputText
              id="jobTitle"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.jobTitle}
              onChange={(e) => setValByKey("jobTitle", e.target.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["jobTitle"]) && (
              <p className="m-0" key="error-jobTitle">
                {error["jobTitle"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="email">Email:</label>
            <InputText
              id="email"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.email}
              onChange={(e) => setValByKey("email", e.target.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["email"]) && (
              <p className="m-0" key="error-email">
                {error["email"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="phone">Phone:</label>
            <InputText
              id="phone"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.phone}
              onChange={(e) => setValByKey("phone", e.target.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["phone"]) && (
              <p className="m-0" key="error-phone">
                {error["phone"]}
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
            <label htmlFor="notes">Notes:</label>
            <InputTextarea
              id="notes"
              rows={5}
              cols={30}
              value={_entity?.notes}
              onChange={(e) => setValByKey("notes", e.target.value)}
              autoResize
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["notes"]) && (
              <p className="m-0" key="error-notes">
                {error["notes"]}
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

export default connect(mapState, mapDispatch)(ContactsEditDialogComponent);
