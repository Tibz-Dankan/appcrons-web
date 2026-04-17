
# TestSprite AI Testing Report(MCP)

---

## 1️⃣ Document Metadata
- **Project Name:** appcrons-web
- **Date:** 2026-04-17
- **Prepared by:** TestSprite AI Team

---

## 2️⃣ Requirement Validation Summary

#### Test TC008 Disabled state remains consistent between dashboard and app details
- **Test Code:** [TC008_Disabled_state_remains_consistent_between_dashboard_and_app_details.py](./TC008_Disabled_state_remains_consistent_between_dashboard_and_app_details.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/aeba73bd-42b6-439a-a829-9aa308442d67/d1579402-13de-4598-b358-87c742b7b15b
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC011 Delete an existing Request Time Frame (RTF) from an application
- **Test Code:** [TC011_Delete_an_existing_Request_Time_Frame_RTF_from_an_application.py](./TC011_Delete_an_existing_Request_Time_Frame_RTF_from_an_application.py)
- **Test Error:** TEST BLOCKED

The test cannot proceed because the application's details page (app subdomain) returns an empty response and is not reachable from the browser. This prevents accessing the Request Time Frames UI required by the test.

Observations:
- The dashboard lists the newly created application and shows it enabled.
- Clicking the application's URL opened one or more app subdomain tabs that show ERR_EMPTY_RESPONSE (empty response) instead of the app UI.
- The Request Time Frames section is only available in the app details view, which cannot be reached due to the empty-response error.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/aeba73bd-42b6-439a-a829-9aa308442d67/7e4e534f-6ada-4b53-9fbc-89ec42f34b02
- **Status:** BLOCKED
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---


## 3️⃣ Coverage & Matching Metrics

- **50.00** of tests passed

| Requirement        | Total Tests | ✅ Passed | ❌ Failed  |
|--------------------|-------------|-----------|------------|
| ...                | ...         | ...       | ...        |
---


## 4️⃣ Key Gaps / Risks
{AI_GNERATED_KET_GAPS_AND_RISKS}
---