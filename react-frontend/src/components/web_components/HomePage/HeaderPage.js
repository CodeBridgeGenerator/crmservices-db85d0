import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { StyleClass } from "primereact/styleclass";
import { Ripple } from "primereact/ripple";
import { Button } from "primereact/button";

const HeaderPage = () => {
  const btnRefMobile = useRef(null);
  const btnRefModules = useRef(null);
  const btnRefResources = useRef(null);

  const navigate = useNavigate();
  const label = process.env.REACT_APP_PROJECT_LABEL || "CRM";

  const modules = [
    {
      label: "Accounts",
      desc: "Companies & customers you manage",
      icon: "pi pi-building",
    },
    {
      label: "Contacts",
      desc: "People, roles, and communication",
      icon: "pi pi-users",
    },
    {
      label: "Opportunities",
      desc: "Pipeline stages & forecasting",
      icon: "pi pi-briefcase",
    },
    {
      label: "Negotiations",
      desc: "Discounts, objections, approvals",
      icon: "pi pi-comments",
    },
    {
      label: "Contracts",
      desc: "Draft → signed → renewals",
      icon: "pi pi-file-edit",
    },
  ];

  const resources = [
    {
      label: "Template Overview",
      desc: "What’s included in this CRM demo",
      icon: "pi pi-info-circle",
    },
    {
      label: "Data Model",
      desc: "Accounts, deals, negotiations, contracts",
      icon: "pi pi-sitemap",
    },
    {
      label: "Automation Ideas",
      desc: "Follow-ups, reminders, SLA tracking",
      icon: "pi pi-bolt",
    },
  ];

  return (
    <>
      <div
        className="py-3 px-6 shadow-2 flex align-items-center justify-content-between relative"
        style={{
          background:
            "linear-gradient(90deg, rgba(20,10,30,1) 0%, rgba(16,20,40,1) 45%, rgba(40,10,20,1) 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Brand */}
        <div className="flex align-items-center gap-3">
          <div
            className="flex align-items-center justify-content-center"
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              background:
                "linear-gradient(135deg, rgba(255,214,0,0.9), rgba(255,70,120,0.85))",
              boxShadow: "0 10px 25px rgba(255, 70, 120, 0.15)",
            }}
          >
            <i className="pi pi-chart-line text-gray-900 text-xl"></i>
          </div>

          <div className="flex flex-column">
            <span className="text-white text-xl font-bold">{label}</span>
          
          </div>
        </div>

        {/* Mobile burger */}
        <StyleClass
          nodeRef={btnRefMobile}
          selector="@next"
          enterClassName="hidden"
          leaveToClassName="hidden"
          hideOnOutsideClick
        >
          <a ref={btnRefMobile} className="cursor-pointer block lg:hidden text-gray-200">
            <i className="pi pi-bars text-3xl"></i>
          </a>
        </StyleClass>

        {/* Desktop menu */}
        <div className="align-items-center flex-grow-1 justify-content-between hidden lg:flex absolute lg:static w-full left-0 top-100 px-6 lg:px-0 shadow-2 lg:shadow-none z-2">
          <section></section>

          <ul className="list-none p-0 m-0 flex lg:align-items-center select-none flex-column lg:flex-row cursor-pointer">
            {/* Modules dropdown */}
            <li>
              <StyleClass
                nodeRef={btnRefModules}
                selector="@next"
                enterClassName="hidden"
                enterActiveClassName="scalein"
                leaveToClassName="hidden"
                leaveActiveClassName="fadeout"
                hideOnOutsideClick
              >
                <a
                  ref={btnRefModules}
                  className="p-ripple flex px-0 lg:px-5 py-3 align-items-center font-medium transition-colors transition-duration-150"
                  style={{ color: "rgba(255,255,255,0.82)" }}
                >
                  <span>Modules</span>
                  <i className="pi pi-chevron-down ml-auto lg:ml-3"></i>
                  <Ripple />
                </a>
              </StyleClass>

              <div
                className="lg:absolute hidden origin-top left-0 top-100 w-70"
                style={{
                  background: "rgba(18,18,24,0.92)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(10px)",
                  borderRadius: 14,
                }}
              >
                <div className="flex flex-wrap p-5">
                  <div className="w-80 lg:w-6 mb-4 lg:mb-0 pr-3">
                    <span className="block font-normal text-2xl mb-2 text-white">
                      CRM Modules
                    </span>
                    <p className="line-height-3 m-0 text-gray-300">
                      Jump into the real services created in CodeBridge.
                    </p>

                    <div
                      className="mt-4 p-3"
                      style={{
                        borderRadius: 12,
                        background: "linear-gradient(135deg, rgba(255,214,0,0.12), rgba(255,70,120,0.10))",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <div className="text-white font-medium mb-1">
                        Tip for demo viewers
                      </div>
                      <div className="text-gray-300 text-sm line-height-3">
                        Each module opens its service list page (CRUD).
                      </div>
                    </div>
                  </div>

                  <div className="w-full lg:w-6">
                    <div className="flex flex-wrap">
                      {modules.map((m, idx) => (
                        <div
                          key={idx}
                          className="w-full px-2 py-2"
                          onClick={() => navigate(m.to)}
                          style={{ cursor: "pointer" }}
                        >
                          <div
                            className="p-3 flex align-items-start gap-3"
                            style={{
                              borderRadius: 12,
                              background: "rgba(255,255,255,0.04)",
                              border: "1px solid rgba(255,255,255,0.07)",
                            }}
                          >
                            <div
                              className="flex align-items-center justify-content-center"
                              style={{
                                width: 38,
                                height: 38,
                                borderRadius: 12,
                                background:
                                  "linear-gradient(135deg, rgba(0,180,255,0.22), rgba(255,70,120,0.18))",
                                border: "1px solid rgba(255,255,255,0.08)",
                              }}
                            >
                              <i className={`${m.icon} text-white`}></i>
                            </div>
                            <div className="flex flex-column">
                              <span className="text-white font-medium">
                                {m.label}
                              </span>
                              <span className="text-gray-300 text-sm mt-1 line-height-3">
                                {m.desc}
                              </span>
                            </div>
                            <i className="pi pi-arrow-right ml-auto text-gray-400 mt-1"></i>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </li>

            {/* Simple display links (demo) */}
            <li>
              <a
                className="p-ripple flex px-0 lg:px-5 py-3 font-medium transition-colors transition-duration-150"
                style={{ color: "rgba(255,255,255,0.82)" }}
                onClick={(e) => e.preventDefault()}
              >
                <span>Solutions</span>
                <Ripple />
              </a>
            </li>

            {/* Resources dropdown */}
            <li>
              <StyleClass
                nodeRef={btnRefResources}
                selector="@next"
                enterClassName="hidden"
                enterActiveClassName="scalein"
                leaveToClassName="hidden"
                leaveActiveClassName="fadeout"
                hideOnOutsideClick
              >
                <a
                  ref={btnRefResources}
                  className="p-ripple flex px-0 lg:px-5 py-3 align-items-center font-medium transition-colors transition-duration-150"
                  style={{ color: "rgba(255,255,255,0.82)" }}
                >
                  <span>Resources</span>
                  <i className="pi pi-chevron-down ml-auto lg:ml-3"></i>
                  <Ripple />
                </a>
              </StyleClass>

              <div
                className="lg:absolute hidden origin-top left-0 top-100 w-70"
                style={{
                  background: "rgba(18,18,24,0.92)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(10px)",
                  borderRadius: 14,
                }}
              >
                <div className="p-5">
                  <div className="text-white text-2xl mb-2">Resources</div>
                  <div className="text-gray-300 mb-4">
                    Demo-only menu items (you can wire these later).
                  </div>

                  <div className="flex flex-wrap">
                    {resources.map((r, idx) => (
                      <div key={idx} className="w-full lg:w-4 px-2 py-2">
                        <div
                          className="p-3"
                          style={{
                            borderRadius: 12,
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.07)",
                          }}
                        >
                          <div className="flex align-items-center gap-2">
                            <i className={`${r.icon} text-yellow-500`}></i>
                            <span className="text-white font-medium">
                              {r.label}
                            </span>
                          </div>
                          <div className="text-gray-300 text-sm mt-2 line-height-3">
                            {r.desc}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </li>

            <li>
              <a
                className="p-ripple flex px-0 lg:px-5 py-3 font-medium transition-colors transition-duration-150"
                style={{ color: "rgba(255,255,255,0.82)" }}
                onClick={(e) => e.preventDefault()}
              >
                <span>Pricing</span>
                <Ripple />
              </a>
            </li>
          </ul>

          {/* Auth buttons */}
          <div className="flex justify-content-between lg:block border-top-1 lg:border-top-none border-gray-800 py-3 lg:py-0 mt-3 lg:mt-0">
            <Button
              label="Login"
              onClick={() => navigate("/login")}
              className="p-button-text font-bold"
              style={{ color: "rgba(255,255,255,0.85)" }}
            />
            <Button
              label="Register"
              onClick={() => navigate("/signup")}
              className="ml-3 font-bold"
              style={{
                borderRadius: 999,
                background:
                  "linear-gradient(135deg, rgba(255,214,0,0.95), rgba(255,70,120,0.9))",
                border: "none",
                color: "#111827",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderPage;
