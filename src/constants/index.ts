// BASE URL
let url: string;
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  url = "http://localhost:8000/api/v1";
} else {
  url = "https://keep-active-backend-v2.onrender.com/api/v1";
}
export { url };
