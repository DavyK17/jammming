import './App.css';

export class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
          <h1>Ja<span class="highlight">mmm</span>ing</h1>
          <div class="App">
              <SearchBar />
              <div class="App-playlist">
              <SearchResults />
              <Playlist />
              </div>
          </div>
      </div>
    );
  }
}
