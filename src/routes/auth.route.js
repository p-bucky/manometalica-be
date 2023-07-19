import { CONFIG_CONSTANTS } from "../constants/config.constant.js";
import authService from "../services/auth.service.js";

async function getGoogleAuthURL(req, res) {
  return res.send(authService.getGoogleAuthURL());
}

async function loginUser(req, res) {
  const code = req.query.code;
  const { id_token, access_token } = await authService.getTokens({
    code,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: `${CONFIG_CONSTANTS.SERVER_ROOT_URI}/${CONFIG_CONSTANTS.GOOGLE_REDIRECT_URL}`,
  });

  const user = await authService.getGoogleUserProfile({
    accessToken: access_token,
    idToken: id_token,
  });

  res.json({user})
}

export default { getGoogleAuthURL, loginUser };
