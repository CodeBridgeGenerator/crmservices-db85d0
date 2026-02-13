import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../../../services/restClient";
import { StyleClass } from "primereact/styleclass";
import { Ripple } from "primereact/ripple";
import { Button } from "primereact/button";
import _ from "lodash";
import moment from "moment";
import HeaderPage from "../HomePage/HeaderPage";

const IntegrationsPage = (props) => {
  const [integrations, setIntegrations] = useState([]);
  useEffect(() => {
    //on mount
    client
      .service("cms")
      .find({
        query: {
          $limit: 10000,
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
          ],
        },
      })
      .then((res) => {
        let results = res.data;
        const regex = /^integrations.*/;
        const integrations = _.filter(results, (obj) => regex.test(obj.name));
        setIntegrations(integrations);
      })
      .catch((error) => {
        console.log({ error });
      });
  }, []);
  return (
    <>
      <HeaderPage />
      <div className="bg-gray-900 px-4 py-8 md:px-6 lg:px-8">
        <div className="flex flex-wrap">

            <div className="grid">
              {integrations.map((item) => (
                <div key={item._id} className="col-12 md:col-6 xl:col-3 p-3">
                  <div
                    className="surface-card shadow-2 border-round p-3"
                    style={{ borderRadius: "6px" }}
                  >
                    <img
                      src="/demo/images/blocks/nature/nature-1.png"
                      alt="nature"
                      className="mb-3 w-full"
                    />
                    <div className="flex justify-content-between align-items-start">
                      <div>
                        <div className="text-xl font-medium text-900 mb-2">
                          {item.headerContent}
                        </div>
                        <p className="mt-0 mb-3 text-600">{item.bodyContent}</p>
                      </div>
                      <Button
                        icon="pi pi-download"
                        className="p-button-rounded p-button-text"
                      />
                    </div>
                    <ul className="list-none m-0 p-0">
                      <li className="px-0 py-2 flex justify-content-between align-items-center border-bottom-1 surface-border">
                        <span className="text-600 font-medium text-sm">
                          Created
                        </span>
                        <span className="text-900 font-medium text-sm">
                          {moment(item.createdAt).fromNow()}
                        </span>
                      </li>
                      <li className="px-0 py-2 flex justify-content-between align-items-center border-bottom-1 surface-border">
                        <span className="text-600 font-medium text-sm">
                          Dimensions
                        </span>
                        <span className="text-900 font-medium text-sm">
                          2732x1690
                        </span>
                      </li>
                      <li className="px-0 py-2 flex justify-content-between align-items-center">
                        <span className="text-600 font-medium text-sm">
                          Resolution
                        </span>
                        <span className="text-900 font-medium text-sm">
                          144x144
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          
        </div>
      </div>
    </>
  );
};

export default IntegrationsPage;
