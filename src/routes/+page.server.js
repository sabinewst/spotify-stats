import { CLIENT_ID, REDIRECT_URI } from "$env/static/private";

export function load() {
  return {
    clientId: CLIENT_ID,
    redirectUri: REDIRECT_URI
  }
}
