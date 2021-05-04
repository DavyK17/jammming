import React from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from "../Playlist/Playlist";
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {name: "name1", artist: "artist1", album: "album1", id: 1, uri: 1},
        {name: "name2", artist: "artist2", album: "album2", id: 2, uri: 2},
        {name: "name3", artist: "artist3", album: "album3", id: 3, uri: 3},
      ],
      playlistName: "DVK's Jams",
      playlistTracks: [
        {name: "name4", artist: "artist4", album: "album4", id: 4, uri: 4},
        {name: "name5", artist: "artist5", album: "album5", id: 5, uri: 5},
        {name: "name6", artist: "artist6", album: "album6", id: 6, uri: 6},
      ],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  addTrack(track) {
    let playlist = this.state.playlistTracks;
    if (playlist.find(savedTrack => savedTrack.id === track.id)) return;
    
    playlist.push(track);
    this.setState({playlistTracks: playlist})
  }

  removeTrack(track) {
    let playlist = this.state.playlistTracks;
    playlist = playlist.filter(savedTrack => savedTrack.id !== track.id)
    
    this.setState({playlistTracks: playlist})
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name})
  }

  savePlaylist() {
    let trackURIs = [];
    let playlist = this.state.playlistTracks;

    for (let track in playlist) {
      trackURIs.push(track.uri)
    }
  }

  render () {
    return (
      <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
              <SearchBar />
              <div className="App-playlist">
                <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
                <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
              </div>
          </div>
      </div>
    );
  }
}

export default App;