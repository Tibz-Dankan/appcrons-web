// BASE URL
let backendURL: string;
let clientURL: string;

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  backendURL = "http://localhost:8080/api/v1";
  clientURL = "http://localhost:3000";
  console.log("process.env.NODE_ENV :", process.env.NODE_ENV);
} else if (process.env.NODE_ENV === "test") {
  // backendURL = "https://keep-active-backend-v2.onrender.com/api/v1";
  backendURL = "http://localhost:8080/api/v1";
  clientURL = "http://localhost:3000";
  console.log("process.env.NODE_ENV :", process.env.NODE_ENV);
} else {
  // backendURL = "https://keep-active-backend-v2.onrender.com/api/v1";
  backendURL = "http://localhost:8080/api/v1";
  clientURL = "http://localhost:3000";
  console.log("process.env.NODE_ENV :", process.env.NODE_ENV);
}
export { backendURL, clientURL };
