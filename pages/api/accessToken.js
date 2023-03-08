import axios from "axios";

export default async function handler(req, res) {

  try {
    const options = {
      method: "POST",
      url: "https://secure.tmsandbox.co.nz/Oauth/AccessToken",
      params: {
        fromCurrency: "USD",
        toCurrency: "HRK",
        amount: "40",
      },
      headers: {
        Authorization: `OAuth oauth_verifier=${req.body.verifier}, oauth_consumer_key=${req.body.consumer}, oauth_token=${req.body.token}, oauth_signature_method=PLAINTEXT, oauth_signature=${req.body.consumerSecret}&${req.body.tokenSecret}`,
      },
    };

    const result = await axios
      .request(options)
      .then((response) => response)
      .catch((error) => console.error(error));

    res.status(201).json({ result });
  } catch (error) {
    console.log(error.message);
    console.log("it is error");
  }
}
