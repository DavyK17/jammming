let token;
const Spotify = {
    getAccessToken() {
        if (token) return token;
    }
};

export default Spotify;