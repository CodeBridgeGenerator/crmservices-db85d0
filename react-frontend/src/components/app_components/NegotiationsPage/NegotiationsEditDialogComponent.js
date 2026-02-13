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
const statusArray = ["Open", "Agreed", "Rejected"];
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

const NegotiationsEditDialogComponent = (props) => {
  const [_entity, set_entity] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const urlParams = useParams();
  const [opportunityId, setOpportunityId] = useState([]);

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

  const onSave = async () => {
    let _data = {
      opportunityId: _entity?.opportunityId?._id,
      negotiationDate: _entity?.negotiationDate,
      status: _entity?.status,
      offeredAmount: _entity?.offeredAmount,
      counterAmount: _entity?.counterAmount,
      notes: _entity?.notes,
    };

    setLoading(true);
    try {
      await client.service("negotiations").patch(_entity._id, _data);
      const eagerResult = await client.service("negotiations").find({
        query: {
          $limit: 10000,
          _id: { $in: [_entity._id] },
          $populate: [
            {
              path: "opportunityId",
              service: "opportunities",
              select: ["name"],
            },
          ],
        },
      });
      props.onHide();
      props.alert({
        type: "success",
        title: "Edit info",
        message: "Info negotiations updated successfully",
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

  return (
    <Dialog
      header="Edit Negotiations"
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
        role="negotiations-edit-dialog-component"
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
            <label htmlFor="negotiationDate">Negotiation Date:</label>
            <Calendar
              id="negotiationDate"
              value={
                _entity?.negotiationDate
                  ? new Date(_entity?.negotiationDate)
                  : null
              }
              onChange={(e) =>
                setValByKey("negotiationDate", new Date(e.value))
              }
              showIcon
              showButtonBar
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["negotiationDate"]) && (
              <p className="m-0" key="error-negotiationDate">
                {error["negotiationDate"]}
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
            <label htmlFor="offeredAmount">Offered Amount:</label>
            <InputNumber
              id="offeredAmount"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.offeredAmount}
              onChange={(e) => setValByKey("offeredAmount", e.value)}
              useGrouping={false}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["offeredAmount"]) && (
              <p className="m-0" key="error-offeredAmount">
                {error["offeredAmount"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="counterAmount">Counter Amount:</label>
            <InputNumber
              id="counterAmount"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.counterAmount}
              onChange={(e) => setValByKey("counterAmount", e.value)}
              useGrouping={false}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["counterAmount"]) && (
              <p className="m-0" key="error-counterAmount">
                {error["counterAmount"]}
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

export default connect(mapState, mapDispatch)(NegotiationsEditDialogComponent);
