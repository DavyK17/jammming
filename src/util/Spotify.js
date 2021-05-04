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
    
    async search(term) {
        const accessToken = Spotify.getAccessToken();
        const url = `https://api.spotify.com/v1/search?type=track&q=${term}`;
        
        try {
            const response = await fetch(url, { headers: {Authorization: `Bearer ${accessToken}` } })
            if (response.ok) {
                    const jsonResponse = await response.json();

                    if (!jsonResponse.tracks) return [];
                    return jsonResponse.tracks.items.map(track => ({
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                    }));
            }
        } catch(error) {
            console.log(error)
        }
    },
};

export default Spotify;