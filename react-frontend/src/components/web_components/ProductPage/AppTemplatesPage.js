import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../../../services/restClient";
import { StyleClass } from "primereact/styleclass";
import { Ripple } from "primereact/ripple";
import { Button } from "primereact/button";
import _ from "lodash";
import HeaderPage from "../HomePage/HeaderPage";

const AppTemplatesPage = (props) => {
  const [appTemplates, setApptemplates] = useState([]);

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
        const regex = /^templates.*/;
        const templates = _.filter(results, (obj) => regex.test(obj.name));
        console.log("templates", templates);
        setApptemplates(templates);
      })
      .catch((error) => {
        console.log({ error });
      });
  }, []);

  return (
    <>
      <HeaderPage />
      <div className="bg-gray-300 px-4 py-8 md:px-6 lg:px-8">
          <div className="grid grid-nogutter">
            {appTemplates.map((item) => (
              <div key={item._id} className="col-12 md:col-6 xl:col-4 p-3">
                <div className="surface-card shadow-2 border-round p-4">
                  <div className="flex border-bottom-1 surface-border pb-4">
                    <img
                      src="/demo/images/blocks/avatars/circle/avatar-f-1.png"
                      style={{ width: "70px", height: "70px" }}
                      className="mr-3"
                      alt="1"
                    />
                    <div className="flex flex-column align-items-start">
                      <span className="text-lg text-900 font-medium mb-1">
                        Lindsay Connor
                      </span>
                      <span className="text-600 font-medium mb-2">
                        Test Engineer
                      </span>
                      <span className="bg-blue-50 text-blue-400 border-round inline-flex py-1 px-2 text-sm">
                        Editor
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          
        </div>
      </div>
    </>
  );
};

export default AppTemplatesPage;
