import React from "react";
import Spotify from '../../util/Spotify';
import { PlaylistListItem } from "../PlaylistListItem/PlaylistListItem";

export class PlaylistList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { playlists: [] }
    }

    mapItems() {
        if(this.props.items) {
            return this.props.items.map(item => {
                return <PlaylistListItem name={item.name} key={item.id} />
            });
        }
    }

    render() {
        return (
            <div className="PlaylistList">
                {this.mapItems()}
            </div>
        );
    }

    componentDidMount() {
        Spotify.getUserPlaylists().then(playlists => this.setState({ playlists: playlists }));   
    }
}