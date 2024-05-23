// BASE URL
let url: string;
let clientURL: string;
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  url = "http://localhost:8000/api/v1";
  clientURL = "http://localhost:3000";
} else {
  url = "https://keep-active-backend-v2.onrender.com/api/v1";
  clientURL = "prod url";
}
export { url, clientURL };
