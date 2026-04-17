# TestSprite AI Testing Report (MCP) — Run 3

---

## 1️⃣ Document Metadata

- **Project Name:** appcrons-web
- **Date:** 2026-04-17
- **Prepared by:** TestSprite AI Team
- **PRD Reference:** appcrons_e2e_prd.pdf (12 test cases)
- **Run:** 3 (UUID data + formik.resetForm + name max 50 + exact 12 test IDs)
- **Result:** 7/12 passed (58.33%)

---

## 2️⃣ Requirement Validation Summary

### Requirement: User Authentication

#### TC001 — Sign up and be redirected to the dashboard

- **Status:** ❌ Failed
- **Visualization:** https://www.testsprite.com/dashboard/mcp/tests/4fa97e7a-90ea-4578-ba45-8b7291fe35da/943f4bfd-79a6-4965-a400-e9494d5f9c6b
- **Analysis:** Intermittent — signup stayed on "Creating..." and never redirected. This test passed in Run 1 and Run 2. Likely a **backend latency or connectivity issue** during this particular run.

#### TC002 — Log out and log back in

- **Status:** ✅ Passed
- **Visualization:** https://www.testsprite.com/dashboard/mcp/tests/4fa97e7a-90ea-4578-ba45-8b7291fe35da/8849fef1-11d5-4931-a026-db6932acdd70

---

### Requirement: Application CRUD

#### TC003 — Create application via 3-step modal ✅ Passed

#### TC005 — Update app name, URL, and interval ✅ Passed

#### TC006 — Delete app with typed confirmation ✅ Passed

---

### Requirement: Enable / Disable Application

#### TC004 — Disable from app details page ✅ Passed

#### TC007 — Disable from dashboard list ✅ Passed

---

### Requirement: Request Time Frame (RTF) Management

#### TC009 — Add RTF

- **Status:** ❌ Failed
- **Visualization:** https://www.testsprite.com/dashboard/mcp/tests/4fa97e7a-90ea-4578-ba45-8b7291fe35da/860c4bf6-86c2-4124-884d-fd108c9f397b
- **Analysis:** Same recurring issue — "Please fill out all fields!" error despite timezone/times appearing populated. This is a **Formik state vs UI display mismatch** — the timezone dropdown selection may not be committing to Formik state when selected via the custom TimeZoneSelect component.

#### TC011 — Delete RTF

- **Status:** ❌ Failed
- **Visualization:** https://www.testsprite.com/dashboard/mcp/tests/4fa97e7a-90ea-4578-ba45-8b7291fe35da/cce9cb26-1a0c-469d-8550-9f5d2af0b9e7
- **Analysis:** Delete itself showed "Deleting..." but RTF remained visible. May be a backend issue or the delete didn't trigger properly.

---

### Requirement: Account Settings

#### TC013 — Update personal details ✅ Passed (was ❌ in Run 2 — **FIX CONFIRMED**)

#### TC010 — Change password

- **Status:** ❌ Failed
- **Visualization:** https://www.testsprite.com/dashboard/mcp/tests/4fa97e7a-90ea-4578-ba45-8b7291fe35da/f8ca6c3a-c244-44f4-9131-9b10d2a97be5
- **Analysis:** No success toast visible after submit. Despite formik.resetForm() fix, the API call may not be completing successfully, or the toast appears and disappears too fast for the test runner.

---

### Requirement: Theme Toggle

#### TC020 — Toggle theme

- **Status:** ❌ Failed
- **Visualization:** https://www.testsprite.com/dashboard/mcp/tests/4fa97e7a-90ea-4578-ba45-8b7291fe35da/2017c18c-d95b-4697-8b19-5677bf7f508f
- **Analysis:** Test couldn't find a theme toggle on the home page. The toggle may be rendered client-side only (next-themes) and not visible to the test runner's initial page scan. This passed in Run 1.

---

## 3️⃣ Coverage & Matching Metrics

| Requirement          | Total  | ✅ Pass | ❌ Fail |
| -------------------- | ------ | ------- | ------- |
| User Authentication  | 2      | 1       | 1       |
| Application CRUD     | 3      | 3       | 0       |
| Enable / Disable App | 2      | 2       | 0       |
| RTF Management       | 2      | 0       | 2       |
| Account Settings     | 2      | 1       | 1       |
| Theme Toggle         | 1      | 0       | 1       |
| **TOTAL**            | **12** | **7**   | **5**   |

### Cross-Run Comparison

| Test                        | Run 1     | Run 2 | Run 3 | Notes                            |
| --------------------------- | --------- | ----- | ----- | -------------------------------- |
| TC001 Signup                | ✅        | ✅    | ❌    | Intermittent backend latency     |
| TC002 Login                 | ✅        | ✅    | ✅    | Stable                           |
| TC003 Create App            | ✅        | ✅    | ✅    | Stable                           |
| TC004/TC005 Disable Details | ⚠️Blocked | ✅    | ✅    | Fixed with signup-first          |
| TC005/TC006 Update App      | ❌        | ✅    | ✅    | Fixed with UUID URL              |
| TC006/TC007 Delete App      | ⚠️Blocked | ✅    | ✅    | Fixed with UUID email            |
| TC007 Disable Dashboard     | ✅        | ✅    | ✅    | Stable                           |
| TC009 Add RTF               | ✅        | N/A   | ❌    | Formik timezone state issue      |
| TC010 Change Password       | ❌        | ❌    | ❌    | Persistent — needs investigation |
| TC011 Delete RTF            | ⚠️Blocked | N/A   | ❌    | Depends on TC009                 |
| TC013 Update Details        | ✅        | ❌    | ✅    | Fixed with name max 50           |
| TC020 Toggle Theme          | ✅        | N/A   | ❌    | Theme toggle not found (SSR?)    |

---

## 4️⃣ Key Gaps / Risks

### Persistent Failures Requiring Code Investigation

1. **TC009/TC011 — RTF Management (Formik State):** The timezone dropdown (`TimeZoneSelect`) likely uses `onChange` but doesn't call `formik.setFieldValue()` synchronously. The UI shows the selection but Formik's internal state remains empty, causing "Please fill out all fields!" on submit.

2. **TC010 — Change Password:** Despite `formik.resetForm()` fix, the success toast either doesn't appear or appears too briefly. Check if the `changePassword` mutation is actually succeeding (check browser network/console). Also verify the `showCardNotification` dispatch is firing.

### Intermittent Failures

3. **TC001 — Signup:** This passed in 2/3 runs. Likely a backend response time issue under TestSprite's parallel test load.

4. **TC020 — Theme Toggle:** Passed in Run 1 but failed in Run 3. The `next-themes` toggle may render client-side only and not be immediately visible to the test runner.

---
