import axios from "axios";
import environment from "../settings/Settings";

export async function authenticate (setIsLoggedIn, setAccountInfo, jwtToken) {
    await axios
      .get(`${environment.backendBaseUrl}/auth`, {
        headers: {
          Authorization: `JWT ${jwtToken}`,
        },
      })
      .then((response) => {
        const accountInfo = response.data.user
        setAccountInfo(response.data.user)
        console.log(accountInfo)

      })
      .catch((err) => {
        setIsLoggedIn(false)
      });
  };

  export default authenticate