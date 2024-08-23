// BASE URL
let backendURL: string;
let clientURL: string;
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  backendURL = "http://localhost:8080/api/v1";
  clientURL = "http://localhost:3000";
} else {
  backendURL = "https://keep-active-backend-v2.onrender.com/api/v1";
  clientURL = "https://appcrons.netlify.app";
}
export { backendURL, clientURL };
