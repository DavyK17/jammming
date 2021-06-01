import React from "react";
import { TrackList } from "../TrackList/TrackList";
import "./Playlist.css";

export class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange({ target }) {
        this.props.onNameChange(target.value)
    }

    render() {
        return(
            <div className="Playlist">
                <input value={this.props.playlistName} onChange={this.handleNameChange} />
                <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true} />
                <div className="Save-buttons">  
                    <button className="Playlist-save" onClick={this.props.onClear}>CLEAR</button>  
                    <button className="Playlist-save" onClick={this.props.onSave}>SAVE</button>
                    <button className="Playlist-save" onClick={this.props.onSaveNew}>SAVE AS NEW</button>
                </div>
            </div>
        );
    }
}