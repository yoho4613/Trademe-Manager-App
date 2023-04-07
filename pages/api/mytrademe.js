import axios from "axios";
import { BASE_URL } from "../../constant/config";
import crypto from "crypto";

export default async function handler(req, res) {
  try {
    const consumerKey = req.body.consumer;
    const oauthToken = req.body.oauth_token;
    const consumerSecret = req.body.consumerSecret;
    const tokenSecret = req.body.token_secret;
    const url = BASE_URL + req.body.url;
    const body = req.body.body || {};

    const options = {
      method: req.body.method || "GET",
      headers: {
        Authorization: "",
        "Content-Type": "application/json",
      },
      url: url,
      data: body,
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

    const result = await axios.request(options);
    res.status(200).json(result.data);
  } catch (error) {
    console.log(error.message)
    console.log("it is error by server");
    res.status(400).json(error.message);
  }
}
