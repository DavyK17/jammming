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
            window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;

            return token;
        }
    },
    
    search(term) {
        fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, { headers: {Authorization: `Bearer ${token}` } })

    },
};

export default Spotify;