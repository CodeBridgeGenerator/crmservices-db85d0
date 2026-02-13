import React from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import HeaderPage from "./HeaderPage";

const HomePage = () => {
  const navigate = useNavigate();

  const modules = [
    {
      title: "Accounts",
      desc: "Track companies, segments, ownership, and relationship context in one place.",
      icon: "pi pi-building",
      accent: "rgba(0,180,255,0.18)",
    },
    {
      title: "Contacts",
      desc: "Manage stakeholders, roles, communication history, and next actions.",
      icon: "pi pi-users",
      accent: "rgba(0,220,160,0.16)",
    },
    {
      title: "Opportunities",
      desc: "Pipeline stages, probability, forecast, expected close date, and deal value.",
      icon: "pi pi-briefcase",
      accent: "rgba(255,214,0,0.16)",
    },
    {
      title: "Negotiations",
      desc: "Track objections, discounts, approvals, competitor notes, and meeting outcomes.",
      icon: "pi pi-comments",
      accent: "rgba(255,70,120,0.14)",
    },
    {
      title: "Contracts",
      desc: "From draft → signed → renewal, with key terms and important dates.",
      icon: "pi pi-file-edit",
      accent: "rgba(140,100,255,0.14)",
    },
  ];

  const valueProps = [
    {
      title: "Pipeline clarity",
      desc: "See where every deal stands and what it needs to move forward.",
      icon: "pi pi-sitemap",
    },
    {
      title: "Stronger follow-ups",
      desc: "Turn notes into actionable next steps so deals don’t stall.",
      icon: "pi pi-calendar",
    },
    {
      title: "Cleaner handoffs",
      desc: "Share deal context across sales, ops, and finance without losing details.",
      icon: "pi pi-share-alt",
    },
    {
      title: "Contract confidence",
      desc: "Track terms, signatures, and renewals without spreadsheet chaos.",
      icon: "pi pi-verified",
    },
  ];

  const useCases = [
    {
      title: "B2B Sales Pipeline",
      desc: "Qualification, proposal, negotiation, close — with forecasting and next actions.",
      icon: "pi pi-chart-line",
    },
    {
      title: "Account Management",
      desc: "Monitor relationship health, key contacts, renewal timelines, and risks.",
      icon: "pi pi-heart",
    },
    {
      title: "Deal Desk / Approvals",
      desc: "Capture discount requests, approval steps, and decision history.",
      icon: "pi pi-shield",
    },
  ];

  const faqs = [
    {
      q: "How do statuses work across modules?",
      a: "Each module can have its own status flow (e.g., Opportunity stages vs Contract lifecycle).",
    },
    {
      q: "Can we track Closed/Won and Closed/Lost?",
      a: "Yes — typically as final stages on Opportunities, plus notes for reasons and competitors.",
    },
    {
      q: "Can we add reminders and tasks later?",
      a: "Definitely — follow-ups, SLAs, automated reminders, and notifications are common add-ons.",
    },
  ];

  return (
    <>
      <HeaderPage />

      {/* HERO */}
      <div
        className="px-4 py-8 md:px-6 lg:px-8"
        style={{
          background:
            "radial-gradient(1200px 600px at 20% 20%, rgba(255,214,0,0.14), transparent 55%)," +
            "radial-gradient(900px 500px at 80% 10%, rgba(255,70,120,0.12), transparent 55%)," +
            "radial-gradient(900px 500px at 80% 80%, rgba(0,180,255,0.12), transparent 60%)," +
            "linear-gradient(180deg, rgba(10,10,18,1) 0%, rgba(14,18,35,1) 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="flex flex-wrap align-items-center">
          <div className="w-12 lg:w-7 p-4">
            <div
              className="inline-flex align-items-center gap-2 px-3 py-2 mb-4"
              style={{
                borderRadius: 999,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.10)",
                color: "rgba(255,255,255,0.85)",
              }}
            >
              <i className="pi pi-sparkles text-yellow-500"></i>
              <span className="text-sm">
                CRM for Accounts • Contacts • Opportunities • Negotiations • Contracts
              </span>
            </div>

            <h1 className="text-6xl font-bold text-white mt-0 mb-3">
              Close deals faster with a CRM built for{" "}
              <span className="text-yellow-500">pipeline flow</span> and{" "}
              <span className="text-pink-400">real follow-ups</span>.
            </h1>

            <p className="text-2xl text-gray-300 mt-0 mb-5 line-height-3">
              Keep relationships organized, deals moving, and contracts under control —
              all with clean stages and consistent records.
            </p>

            <div className="flex flex-wrap gap-3 mt-4">
              <Button
                label="Explore Modules"
                icon="pi pi-th-large"
                className="p-button-rounded p-button-lg font-medium"
                onClick={() => {
                  const el = document.getElementById("crm-modules");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                  border: "none",
                  background:
                    "linear-gradient(135deg, rgba(255,214,0,0.95), rgba(255,70,120,0.90))",
                  color: "#111827",
                }}
              />
              <Button
                label="Open Pipeline"
                icon="pi pi-chart-line"
                className="p-button-rounded p-button-outlined p-button-lg font-medium"
                style={{
                  borderColor: "rgba(255,255,255,0.25)",
                  color: "rgba(255,255,255,0.85)",
                }}
              />
            </div>

            <div className="grid mt-6">
              {valueProps.map((v, idx) => (
                <div key={idx} className="col-12 md:col-6">
                  <div
                    className="p-3"
                    style={{
                      borderRadius: 14,
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div className="text-white font-medium flex align-items-center gap-2">
                      <i className={`${v.icon} text-yellow-500`}></i>
                      <span>{v.title}</span>
                    </div>
                    <div className="text-gray-300 text-sm mt-2 line-height-3">
                      {v.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: CRM flow */}
          <div className="w-12 lg:w-5 p-4">
            <div
              className="p-4"
              style={{
                borderRadius: 18,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.10)",
                boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
              }}
            >
              <div className="text-white text-xl font-bold mb-2">
                Sales lifecycle (at a glance)
              </div>
              <div className="text-gray-300 line-height-3 mb-4">
                A clean end-to-end flow from relationship → deal → agreement.
              </div>

              <div className="flex flex-column gap-2">
                {[
                  { label: "Account", icon: "pi pi-building", color: "rgba(0,180,255,0.18)" },
                  { label: "Contact", icon: "pi pi-user", color: "rgba(0,220,160,0.16)" },
                  { label: "Opportunity", icon: "pi pi-briefcase", color: "rgba(255,214,0,0.16)" },
                  { label: "Negotiation", icon: "pi pi-comments", color: "rgba(255,70,120,0.14)" },
                  { label: "Contract", icon: "pi pi-file-edit", color: "rgba(140,100,255,0.14)" },
                  { label: "Closed / Won", icon: "pi pi-check-circle", color: "rgba(120,255,160,0.12)" },
                ].map((step, idx) => (
                  <div
                    key={idx}
                    className="flex align-items-center justify-content-between p-3"
                    style={{
                      borderRadius: 14,
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <div className="flex align-items-center gap-3">
                      <div
                        className="flex align-items-center justify-content-center"
                        style={{
                          width: 38,
                          height: 38,
                          borderRadius: 14,
                          background: step.color,
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        <i className={`${step.icon} text-white`}></i>
                      </div>
                      <div className="text-white font-medium">{step.label}</div>
                    </div>
                    <i className="pi pi-angle-right text-gray-400"></i>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex gap-2">
                <Button
                  label="Deals"
                  icon="pi pi-briefcase"
                  className="p-button-rounded p-button-sm font-medium"
                />
                <Button
                  label="Contracts"
                  icon="pi pi-file"
                  className="p-button-rounded p-button-outlined p-button-sm font-medium"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODULES */}
      <div id="crm-modules" className="surface-section px-4 py-8 md:px-6 lg:px-8">
        <div className="text-center mb-6">
          <div className="text-900 text-3xl font-bold mb-2">Modules</div>
          <div className="text-600">
            Jump into each area to manage the full relationship-to-revenue flow.
          </div>
        </div>

        <div className="grid">
          {modules.map((m, idx) => (
            <div key={idx} className="col-12 md:col-6 lg:col-4">
              <div
                className="p-4 cursor-pointer"
                onClick={() => navigate(m.to)}
                style={{
                  borderRadius: 18,
                  background: "white",
                  border: "1px solid rgba(0,0,0,0.06)",
                  boxShadow: "0 16px 40px rgba(0,0,0,0.08)",
                }}
              >
                <div className="flex align-items-center justify-content-between mb-3">
                  <div
                    className="flex align-items-center justify-content-center"
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 16,
                      background: m.accent,
                      border: "1px solid rgba(0,0,0,0.05)",
                    }}
                  >
                    <i className={`${m.icon} text-2xl`}></i>
                  </div>
                  <i className="pi pi-arrow-right text-600"></i>
                </div>

                <div className="text-900 text-xl font-bold">{m.title}</div>
                <div className="text-700 mt-2 line-height-3">{m.desc}</div>

                <div className="mt-3 text-sm text-600">
                  <i className="pi pi-arrow-right mr-2"></i>
                  Open {m.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* USE CASES */}
      <div className="surface-ground px-4 py-8 md:px-6 lg:px-8">
        <div className="text-center mb-6">
          <div className="text-900 text-3xl font-bold mb-2">Built for real sales work</div>
          <div className="text-600">
            Cover the most common CRM scenarios without extra complexity.
          </div>
        </div>

        <div className="grid">
          {useCases.map((u, idx) => (
            <div key={idx} className="col-12 md:col-4">
              <div
                className="p-5"
                style={{
                  borderRadius: 18,
                  background: "white",
                  border: "1px solid rgba(0,0,0,0.06)",
                  boxShadow: "0 16px 40px rgba(0,0,0,0.06)",
                }}
              >
                <div className="flex align-items-center gap-2">
                  <i className={`${u.icon} text-xl text-purple-600`}></i>
                  <div className="text-900 text-xl font-bold">{u.title}</div>
                </div>
                <div className="text-700 mt-3 line-height-3">{u.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STORY + KPI STRIP */}
      <div className="surface-section px-4 py-8 md:px-6 lg:px-8">
        <div className="grid align-items-stretch">
          <div className="col-12 lg:col-7">
            <div
              className="p-6 h-full"
              style={{
                borderRadius: 18,
                background:
                  "linear-gradient(135deg, rgba(255,214,0,0.12), rgba(255,70,120,0.10), rgba(0,180,255,0.10))",
                border: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <div className="text-900 text-2xl font-bold mb-3">
                Keep momentum from first meeting to signature
              </div>
              <div className="text-700 line-height-3 text-lg">
                A good CRM doesn’t just store records — it helps you move deals forward.
                Track next steps, negotiation history, and contract timelines so nothing slips.
              </div>
              <div className="mt-4 text-700 flex align-items-center gap-2">
                <i className="pi pi-bolt text-yellow-500"></i>
                <span className="text-600">Less chasing, more closing.</span>
              </div>
            </div>
          </div>

          <div className="col-12 lg:col-5">
            <div className="grid h-full">
              {[
                { label: "Deals Tracked", value: "1,240", icon: "pi pi-briefcase" },
                { label: "Win Rate", value: "34%", icon: "pi pi-percentage" },
                { label: "Avg Cycle", value: "18d", icon: "pi pi-clock" },
                { label: "Renewals", value: "62", icon: "pi pi-refresh" },
              ].map((k, idx) => (
                <div key={idx} className="col-12 md:col-6">
                  <div
                    className="p-4 h-full"
                    style={{
                      borderRadius: 18,
                      background: "white",
                      border: "1px solid rgba(0,0,0,0.06)",
                      boxShadow: "0 16px 40px rgba(0,0,0,0.06)",
                    }}
                  >
                    <div className="flex align-items-center gap-2 text-600">
                      <i className={`${k.icon}`}></i>
                      <span className="text-sm">{k.label}</span>
                    </div>
                    <div className="text-900 text-3xl font-bold mt-2">
                      {k.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="surface-ground px-4 py-8 md:px-6 lg:px-8">
        <div className="text-center mb-6">
          <div className="text-900 text-3xl font-bold mb-2">FAQ</div>
          <div className="text-600">Common CRM questions</div>
        </div>

        <div className="grid">
          {faqs.map((f, idx) => (
            <div key={idx} className="col-12 md:col-4">
              <div
                className="p-5"
                style={{
                  borderRadius: 18,
                  background: "white",
                  border: "1px solid rgba(0,0,0,0.06)",
                  boxShadow: "0 16px 40px rgba(0,0,0,0.06)",
                }}
              >
                <div className="text-900 font-bold text-lg">{f.q}</div>
                <div className="text-700 mt-3 line-height-3">{f.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FINAL CTA */}
      <div className="surface-section px-4 py-8 md:px-6 lg:px-8">
        <div
          className="p-6 flex flex-wrap align-items-center justify-content-between"
          style={{
            borderRadius: 18,
            background:
              "linear-gradient(135deg, rgba(10,10,18,1), rgba(14,18,35,1))",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="w-12 lg:w-8">
            <div className="text-white text-3xl font-bold">
              Ready to organize your pipeline?
            </div>
            <div className="text-gray-300 mt-2 line-height-3">
              Start with Accounts and Contacts, then move deals through Opportunities,
              Negotiations, and Contracts — all in one flow.
            </div>
          </div>

          <div className="w-12 lg:w-4 mt-4 lg:mt-0 flex lg:justify-content-end gap-2">
            <Button
              label="Open Accounts"
              icon="pi pi-building"
              className="p-button-rounded font-medium"
              onClick={() => navigate("/app/accounts")}
            />
            <Button
              label="Open Pipeline"
              icon="pi pi-chart-line"
              className="p-button-rounded p-button-outlined font-medium"
              onClick={() => navigate("/app/opportunities")}
              style={{ color: "white", borderColor: "rgba(255,255,255,0.25)" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
