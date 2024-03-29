import axios from "axios";
import { BASE_URL } from "../../constant/config";
import crypto from "crypto";

export default async function handler(req, res) {
  console.log(req.body)

  try {
    const consumerKey = req.body.user.consumer;
    const oauthToken = req.body.user.oauth_token;
    const consumerSecret = req.body.user.consumerSecret;
    const tokenSecret = req.body.user.token_secret;
    const url = BASE_URL + req.body.url;
    const body = req.body.body || {};


    const options = {
      method: req.body.method || "GET",
      headers: {
        Authorization: "",
      },
      body: {
        ...body
      }
    };

    const oauthParams = {
      oauth_consumer_key: consumerKey,
      oauth_nonce: crypto.randomBytes(16).toString("hex"),
      oauth_signature_method: "HMAC-SHA1",
      oauth_timestamp: Math.floor(Date.now() / 1000),
      oauth_token: oauthToken,
      oauth_version: "1.0",
    };

    const signatureBaseString = `${options.method}&${encodeURIComponent(
      url
    )}&${encodeURIComponent(
      Object.entries({ ...options.params, ...oauthParams })
        .sort()
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join("&")
    )}`;

    const signingKey = `${encodeURIComponent(
      consumerSecret
    )}&${encodeURIComponent(tokenSecret)}`;

    const oauthSignature = crypto
      .createHmac("sha1", signingKey)
      .update(signatureBaseString)
      .digest("base64");

    options.headers.Authorization = `OAuth ${Object.entries(oauthParams)
      .map(([key, value]) => `${key}="${encodeURIComponent(value)}"`)
      .concat(`oauth_signature="${encodeURIComponent(oauthSignature)}"`)
      .join(", ")}`;

console.log(options)
    const result = await axios
      .post(url, body, options)
      .then((res) => res)
      .catch((err) => console.log(err.message));
    res.status(200).json(result.data);
  } catch (error) {
    console.log(error.message);
    console.log("it is error by server");
  }
}
