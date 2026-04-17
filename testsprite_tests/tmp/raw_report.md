
# TestSprite AI Testing Report(MCP)

---

## 1️⃣ Document Metadata
- **Project Name:** appcrons-web
- **Date:** 2026-04-17
- **Prepared by:** TestSprite AI Team

---

## 2️⃣ Requirement Validation Summary

#### Test TC001 Sign up and be redirected to the dashboard
- **Test Code:** [TC001_Sign_up_and_be_redirected_to_the_dashboard.py](./TC001_Sign_up_and_be_redirected_to_the_dashboard.py)
- **Test Error:** TEST FAILURE

The signup process did not complete — after submitting the form the app remained on the sign-up page showing a 'Creating...' state and did not redirect to a dashboard.

Observations:
- The page stayed at /auth/signup and still displays the sign-up form with the Create button.
- No dashboard indicators were present (no 'Dashboard', 'Your apps', 'Create app', 'Sign out', or user avatar).
- The UI showed a 'Creating...' state and did not proceed after multiple waits.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4fa97e7a-90ea-4578-ba45-8b7291fe35da/943f4bfd-79a6-4965-a400-e9494d5f9c6b
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC002 Log out and log back in to return to the dashboard
- **Test Code:** [TC002_Log_out_and_log_back_in_to_return_to_the_dashboard.py](./TC002_Log_out_and_log_back_in_to_return_to_the_dashboard.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4fa97e7a-90ea-4578-ba45-8b7291fe35da/8849fef1-11d5-4931-a026-db6932acdd70
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC003 Create an application via the 3-step modal and land on the app details page
- **Test Code:** [TC003_Create_an_application_via_the_3_step_modal_and_land_on_the_app_details_page.py](./TC003_Create_an_application_via_the_3_step_modal_and_land_on_the_app_details_page.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4fa97e7a-90ea-4578-ba45-8b7291fe35da/02efb01b-0b22-44e3-b293-15dfa571aa0f
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC004 Disable an enabled application from its details page
- **Test Code:** [TC004_Disable_an_enabled_application_from_its_details_page.py](./TC004_Disable_an_enabled_application_from_its_details_page.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4fa97e7a-90ea-4578-ba45-8b7291fe35da/04fa7a18-6a73-4c08-9e91-a6481a1be649
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC005 Update an application's name, URL, and interval from app details
- **Test Code:** [TC005_Update_an_applications_name_URL_and_interval_from_app_details.py](./TC005_Update_an_applications_name_URL_and_interval_from_app_details.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4fa97e7a-90ea-4578-ba45-8b7291fe35da/3e878289-dfca-449c-9e5d-de3b720ee5c7
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC006 Delete an application with typed confirmation
- **Test Code:** [TC006_Delete_an_application_with_typed_confirmation.py](./TC006_Delete_an_application_with_typed_confirmation.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4fa97e7a-90ea-4578-ba45-8b7291fe35da/2dcf7be1-ee09-49af-abff-ee4c41414483
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC007 Disable an enabled application from the dashboard list
- **Test Code:** [TC007_Disable_an_enabled_application_from_the_dashboard_list.py](./TC007_Disable_an_enabled_application_from_the_dashboard_list.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4fa97e7a-90ea-4578-ba45-8b7291fe35da/e614eabd-2675-4db0-8658-af1044f085a5
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC009 Add a Request Time Frame (RTF) to an application
- **Test Code:** [TC009_Add_a_Request_Time_Frame_RTF_to_an_application.py](./TC009_Add_a_Request_Time_Frame_RTF_to_an_application.py)
- **Test Error:** TEST FAILURE

Submitting the Add Request Time Frame form did not create the new time range. The form shows a valid timezone and times, but no success confirmation and no new entry appears in the Existing Time Ranges list.

Observations:
- The Add RTF modal shows timezone='Africa/Cairo', Start='06:00AM', End='11:00PM' and the message 'The selected time range is valid'.
- The first submit produced an error toast: 'Please fill out all fields!'. A subsequent submit left the modal open and no success toast appeared.
- The Existing Time Ranges list remains empty and no new time range entry is visible on the page.

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4fa97e7a-90ea-4578-ba45-8b7291fe35da/860c4bf6-86c2-4124-884d-fd108c9f397b
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC010 Change password successfully from Settings
- **Test Code:** [TC010_Change_password_successfully_from_Settings.py](./TC010_Change_password_successfully_from_Settings.py)
- **Test Error:** TEST FAILURE

Changing the password did not complete as expected — the application did not show the required success confirmation and the form state was not verified as cleared.

Observations:
- No success toast like 'Password changed successfully!' was visible after submitting the change-password form.
- The password fields could not be confirmed as cleared (no evidence in the page content that the inputs were emptied).
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4fa97e7a-90ea-4578-ba45-8b7291fe35da/f8ca6c3a-c244-44f4-9131-9b10d2a97be5
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC011 Delete an existing Request Time Frame (RTF) from an application
- **Test Code:** [TC011_Delete_an_existing_Request_Time_Frame_RTF_from_an_application.py](./TC011_Delete_an_existing_Request_Time_Frame_RTF_from_an_application.py)
- **Test Error:** TEST FAILURE

Deleting the Request Time Frame did not remove it from the list.

Observations:
- The delete confirmation dialog showed 'deleting...' after confirming deletion.
- After waiting, the Request Time Frame '06:00AM - 11:00PM' (Africa/Cairo) is still visible in the Request Time Frames list.
- No deletion success message or toast was shown.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4fa97e7a-90ea-4578-ba45-8b7291fe35da/cce9cb26-1a0c-469d-8550-9f5d2af0b9e7
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC013 Update personal details from Settings
- **Test Code:** [TC013_Update_personal_details_from_Settings.py](./TC013_Update_personal_details_from_Settings.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4fa97e7a-90ea-4578-ba45-8b7291fe35da/e6887477-76fc-4662-b5a9-da87ac57f2e3
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC020 Toggle theme between dark and light on the home page
- **Test Code:** [TC020_Toggle_theme_between_dark_and_light_on_the_home_page.py](./TC020_Toggle_theme_between_dark_and_light_on_the_home_page.py)
- **Test Error:** TEST FAILURE

The site does not provide a visible theme toggle on the home page, so a visitor cannot switch between light and dark modes as required.

Observations:
- The top navigation shows 'Docs', 'Log In', and 'Sign Up' but no theme toggle or sun/moon icon was present.
- The page's interactive elements list (inspected) does not include any button or control that appears to be a theme toggle.

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/4fa97e7a-90ea-4578-ba45-8b7291fe35da/2017c18c-d95b-4697-8b19-5677bf7f508f
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---


## 3️⃣ Coverage & Matching Metrics

- **58.33** of tests passed

| Requirement        | Total Tests | ✅ Passed | ❌ Failed  |
|--------------------|-------------|-----------|------------|
| ...                | ...         | ...       | ...        |
---


## 4️⃣ Key Gaps / Risks
{AI_GNERATED_KET_GAPS_AND_RISKS}
---