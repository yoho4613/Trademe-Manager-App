import axios from "axios";
import { BASE_URL_SECURE } from "../../constant/config";
import { HOSTING_URL } from "../../constant/config";

export default async function handler(req, res) {
  try {
    const { consumer, secret } = req.body;
    const options = {
      method: "POST",
      url: `${BASE_URL_SECURE}/Oauth/RequestToken`,
      params: {
        scope: "MyTradeMeRead,MyTradeMeWrite",
      },
      headers: {
        Authorization: `OAuth 0auth_callback=${HOSTING_URL},oauth_consumer_key=${consumer},oauth_signature_method=PLAINTEXT,oauth_signature=${secret}&`,
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
