import querystring from "node:querystring";
import { CONFIG_CONSTANTS } from "../constants/config.constant.js";
import axios from "axios";

function getGoogleAuthURL() {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: `${CONFIG_CONSTANTS.SERVER_ROOT_URI}/${CONFIG_CONSTANTS.GOOGLE_REDIRECT_URL}`,
    client_id: process.env.GOOGLE_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };

  return `${rootUrl}?${querystring.stringify(options)}`;
}

async function getTokens({ code, clientId, clientSecret, redirectUri }) {
  const url = "https://oauth2.googleapis.com/token";
  const values = {
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    grant_type: "authorization_code",
  };

  try {
    const token = await axios.post(url, querystring.stringify(values), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return token.data;
  } catch (err) {
    console.error(`Failed to fetch auth token`);
  }
}

async function getGoogleUserProfile({ accessToken, idToken }) {
  try {
    const user = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`,
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );

    return user.data;
  } catch (err) {
    console.error(`Failed to fetch user`);
  }
}

export default { getGoogleAuthURL, getTokens, getGoogleUserProfile };
