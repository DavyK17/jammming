let token;

const clientID = "e8d73ef03a7948cab3869877d18d0777";
const redirectURI = "http://localhost:3000/";

const Spotify = {
    getAccessToken() {
        if (token) return token;

        const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiryMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (tokenMatch && expiryMatch) {
            token = tokenMatch[1];
            let expiryTime = Number(expiryMatch[1]);

            window.setTimeout(() => token = "", expiryTime * 1000);
            window.history.pushState("Access Token", null, "/");

            return token;
        }
    }
};

export default Spotify;