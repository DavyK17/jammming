import React from "react";
import './SearchBar.css';

export class SearchBar extends React.Component {
    search(term) {
        this.props.onSearch(term);
    }

    render() {
        return (
          <div className="SearchBar">
              <input placeholder="Enter A Song, Album, or Artist" />
              <button className="SearchButton">SEARCH</button>
          </div>
        );
    }
}