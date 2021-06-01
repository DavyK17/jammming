# Jammming

This is a challenge project I did as part of my full stack engineer course on [Codecademy](https://codecademy.com/). The website is a React web app that connects to the user's [Spotify](https://spotify.com/) account and allows them to search for tracks, add them to a new playlist and save the playlist to their account. The web app can be viewed at [dvk-jammming.netlify.app](https://dvk-jammming.netlify.app/).

## Feature request: Retrieve, select and modify existing playlists (with a twist)

For the challenge project's feature request, I'll admit that I felt too lazy to draft and implement a new feature request from scratch, so I decided to implement the example provided. Building on the base project, the web app also retrieves a list of existing playlists on the user's account, any of which they can select. The app's state is updated with the selected playlist's ID, name and tracks upon selection, allowing the user to modify the playlist by adding and removing tracks, as well as editing the playlist's name.

However, I went a few steps further and added some functionality:
* The web app only displays playlists created (owned) by the user, both public and private.
* The user may refresh the list of playlists displayed by using the "Refresh" button beneath (makes a fresh call to the Spotify API). The list is also automatically refreshed once the current playlist is saved.
* Upon selecting an existing playlist and adding/removing tracks, the user may save the changes to the current playlist as a new playlist (resets playlist ID state to `null` and calls the save function).
* The user may clear the current playlist from the web app (resets state for playlist ID, name and tracks to default) and start editing again from scratch.