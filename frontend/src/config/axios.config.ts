export const BASEAPI = "http://localhost:3333/api";

export const getAccessToken = () => {
  const token = localStorage.getItem("access_token");
  return token;
};

export const HeaderData = async () => {
  const token = localStorage.getItem("access_token");
  if (token == null) {
    return {
      "Content-Type": "application/json",
    };
  } else {
    return {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
  }
};
