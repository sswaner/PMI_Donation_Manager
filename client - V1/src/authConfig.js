export const msalConfig = {
  auth: {
    clientId: "befb8220-7445-4cfd-9ef9-a604bc943c4b",
    authority: "https://login.microsoftonline.com/5493b3f7-b80c-40bb-9c5a-137b3c1a5b6d",
    redirectUri: "http://localhost:8000/auth/callback",  // Or your production redirect URI
  },
  cache: {
    cacheLocation: "sessionStorage", // or "sessionStorage"
    storeAuthStateInCookie: false,
  }
};
