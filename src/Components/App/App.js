import React from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from "../Playlist/Playlist";
import { PlaylistList } from "../PlaylistList/PlaylistList";
import './App.css';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistID: null,
      playlistName: "New Playlist",
      playlistTracks: [],
      playlists: []
    };
    this.getUserPlaylists = this.getUserPlaylists.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.saveNewPlaylist = this.saveNewPlaylist.bind(this);
    this.clearPlaylist = this.clearPlaylist.bind(this);
    this.search = this.search.bind(this);
    this.selectPlaylist = this.selectPlaylist.bind(this);
  }

  getUserPlaylists() {
    Spotify.getUserPlaylists().then(playlists => this.setState({ playlists: playlists }));   
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
    let trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs, this.state.playlistID).then(() => {
      this.clearPlaylist();
      Spotify.getUserPlaylists().then(playlists => this.setState({ playlists: playlists }));   
    });
  }

  saveNewPlaylist() {
    this.setState({ playlistID: null }, () => this.savePlaylist());
  }

  clearPlaylist() {
    this.setState({ playlistID: null, playlistName: "New Playlist", playlistTracks: [] });
  }

  search(term) {
    Spotify.search(term).then(results => this.setState({searchResults: results}));
  }

  selectPlaylist(id) {
    Spotify.getPlaylist(id).then(response => {
      const playlistTracks = response.tracks.items.map(item => ({
        id: item.track.id,
        name: item.track.name,
        artist: item.track.artists[0].name,
        album: item.track.album.name,
        uri: item.track.uri
      }));
      
      this.setState({ playlistID: id, playlistName: response.name, playlistTracks: playlistTracks })
    })
  }

  render () {
    return (
      <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
              <SearchBar onSearch={this.search} />
              <div className="App-playlist">
                <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
                <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onClear={this.clearPlaylist} onSave={this.savePlaylist} onSaveNew={this.saveNewPlaylist} />
                <PlaylistList items={this.state.playlists} selectPlaylist={this.selectPlaylist} refresh={this.getUserPlaylists} />
              </div>
          </div>
      </div>
    );
  }
  
  componentDidMount() {
    this.getUserPlaylists();   
  }
}

export default App;