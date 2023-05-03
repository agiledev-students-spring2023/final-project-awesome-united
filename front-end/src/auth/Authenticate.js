import axios from "axios";

export async function authenticate (setIsLoggedIn, setAccountInfo, jwtToken) {
    await axios
      .get("http://localhost:3001/auth", {
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