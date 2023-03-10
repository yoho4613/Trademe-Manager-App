import axios from "axios";

export default async function handler(req, res) {
  try {
    const { consumer, secret } = req.body;
    const options = {
      method: "POST",
      url: "https://secure.tmsandbox.co.nz/Oauth/RequestToken",
      params: {
        scope: "MyTradeMeRead,MyTradeMeWrite",
      },
      headers: {
        Authorization: `OAuth 0auth_callback=https://developer.trademe.co.nz/,oauth_consumer_key=${consumer},oauth_signature_method=PLAINTEXT,oauth_signature=${secret}&`,
      },
    };

    const result = await axios
      .request(options)
      .then((response) => response.data)
      .catch((error) => console.error(error));
    
    res.status(200).json({ result });
  } catch (error) {
    console.log(error.message);
    console.log("it is error");
  }
}


