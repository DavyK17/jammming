import React from "react";
import { Track } from "../Track/Track";
import "./TrackList.css";

export class TrackList extends React.Component {
    renderTracks() {
        const tracks = this.props.tracks;

        return tracks.map(track => {
            return <Track track={track} key={track.id} />
        })
    }

    render() {
        return (
            <div className="TrackList">
                {this.renderTracks()}
            </div>
        );
    }
}