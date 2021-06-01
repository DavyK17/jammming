let token;
let userID;

const clientID = "e8d73ef03a7948cab3869877d18d0777";
const redirectURI = "https://dvk-jammming.netlify.app";

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
        } else {
            window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        }
    },
    
    async getCurrentUserId() {
        if (userID) return userID;

        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        const url = "https://api.spotify.com/v1/me";
        
        try {
            const response = await fetch(url, { headers: headers });
            if (response.ok) {
                    const jsonResponse = await response.json();
                    userID = jsonResponse.id;
                    return userID;
            }
        } catch(error) {
                console.log(error);
        }
    },
    
    async search(term) {
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        const url = `https://api.spotify.com/v1/search?type=track&q=${term}`;
        
        try {
            const response = await fetch(url, { headers: headers });
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

    async savePlaylist(name, URIs, id) {
        if (!name || !URIs.length) return;

        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        const currentUser = await Spotify.getCurrentUserId();

        if (id) {
            try {
                const url = `https://api.spotify.com/v1/playlists/${id}`;
                const response = await fetch(url, {
                    headers: headers,
                    method: "PUT",
                    body: JSON.stringify({ name: name })
                });
                if(response.ok) {
                    try {
                        const url = `https://api.spotify.com/v1/playlists/${id}/tracks`;
                        const response = await fetch(url, {
                            headers: headers,
                            method: "PUT",
                            body: JSON.stringify({ uris: URIs })
                        });
                        if(response.ok) {
                            const jsonResponse = await response.json();
                            console.log(jsonResponse);
                        }
                    } catch(error) {
                        console.log(error);
                    }
                }

            } catch(error) {
                console.log(error);
            }
        } else {
            const url = `https://api.spotify.com/v1/users/${currentUser}/playlists`;
            try {
                const response = await fetch(url, {
                    headers: headers,
                    method: "POST",
                    body: JSON.stringify({ name: name })
                });
                if (response.ok) {
                    const jsonResponse = await response.json();
                    const playlistID = jsonResponse.id;
                    const url = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`;

                    try {
                        const response = await fetch(url, {
                            headers: headers,
                            method: "POST",
                            body: JSON.stringify({ uris: URIs })
                        });
                        if (response.ok) {
                            const jsonResponse = await response.json();
                            console.log(jsonResponse);
                        }
                    } catch(error) {
                        console.log(error);
                    }
                }
            } catch(error) {
                console.log(error)
            }
        }
    },

    async getUserPlaylists() {
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        const currentUser = await Spotify.getCurrentUserId();
        const url = `https://api.spotify.com/v1/users/${currentUser}/playlists?limit=50`;

        try {
            const response = await fetch(url, { headers: headers });
            if(response.ok) {
                const jsonResponse = await response.json();

                if(!jsonResponse.items) return [];
                return jsonResponse.items.map(playlist => ({
                    id: playlist.id,
                    name: playlist.name
                }));
            }

        } catch(error) {
            console.log(error);
        }
    },

    async getPlaylist(id) {
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        const url = `https://api.spotify.com/v1/playlists/${id}`;

        try {
            const response = await fetch(url, { headers: headers });
            if (response.ok) {
                const jsonResponse = await response.json();
                console.log(jsonResponse);
                return jsonResponse;
            }
        } catch(error) {
            console.log(error);
        }
    },
};

export default Spotify;