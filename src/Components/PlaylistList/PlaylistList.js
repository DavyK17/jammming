import React from "react";
import { PlaylistListItem } from "../PlaylistListItem/PlaylistListItem";
import "./PlaylistList.css";

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
                <h2>Local Playlists</h2>
                {this.mapItems()}
            </div>
        );
    }
}