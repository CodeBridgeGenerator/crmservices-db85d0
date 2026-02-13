import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../../../services/restClient";
import { StyleClass } from "primereact/styleclass";
import { Ripple } from "primereact/ripple";
import { Button } from "primereact/button";
import _ from "lodash";
import HeaderPage from "../HomePage/HeaderPage";

const FeaturesListPage = (props) => {
  const [features, setFeatures] = useState([]);
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
        const regex = /^features.*/;
        const features = _.filter(results, (obj) => regex.test(obj.name));
        setFeatures(features);
      })
      .catch((error) => {
        console.log({ error });
      });
  }, []);

  console.log(features);
  return (
    <>
      <HeaderPage />
      <div className="bg-gray-900 px-4 py-8 md:px-6 lg:px-8">
        <div className="flex flex-wrap">
          <div className="grid">
            {features.map((item) => (
              <>
                <div y={item._id} className="col-12 lg:col-4 p-3">
                  <div className="shadow-2 border-round surface-card mb-3 h-full flex-column justify-content-between flex">
                    <div className="p-4">
                      <div className="flex align-items-center">
                        <span
                          className="inline-flex border-circle align-items-center justify-content-center bg-green-100 mr-3"
                          style={{ width: "38px", height: "38px" }}
                        >
                          <i className="pi pi-globe text-xl text-green-600"></i>
                        </span>
                        <span className="text-900 font-medium text-2xl">
                          {_.startCase(item.name)}
                        </span>
                      </div>
                      <div className="text-900 my-3 text-xl font-medium">
                        {item.headerContent}
                      </div>
                      <p className="mt-0 mb-3 text-700 line-height-3">
                        {item.bodyContent}
                      </p>
                    </div>
                    <div className="px-4 py-3 surface-100 text-right">
                      <Button
                        icon="pi pi-arrow-right"
                        label="More"
                        className="p-button-rounded p-button-success"
                        iconPos="right"
                        link={item.path}
                      />
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturesListPage;
