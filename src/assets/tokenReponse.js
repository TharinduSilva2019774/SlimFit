export const tokenPayload = {
  token: "",
};

export function parseResponseToTokenPayload(jsonResponse) {
  // Assuming jsonResponse is already parsed from the HTTP response
  tokenPayload.token = jsonResponse.token;
  return tokenPayload;
}
