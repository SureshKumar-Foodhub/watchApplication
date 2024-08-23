const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export const sendFcmTokenToServer = ({ token }) => {
  const raw = JSON.stringify({
    token,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  fetch(
    "https://md8veqzja4.execute-api.us-east-1.amazonaws.com/dineshgowdam/pdq/clients/dummyOrder/dummyOrder",
    requestOptions
  )
    .then((response) => response.json())
    .then(() => {})
    .catch((error) => console.error(error));
};
