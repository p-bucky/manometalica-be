let constants = {
  SERVER_ROOT_URI: "http://localhost:3001",
};

if (process.env.ENV == "PROD") {
  constants = {
    SERVER_ROOT_URI: "http://manometalica.com",
  };
}

export const CONFIG_CONSTANTS = {
  GOOGLE_REDIRECT_URL: "mano/auth/google",
  ...constants,
};
