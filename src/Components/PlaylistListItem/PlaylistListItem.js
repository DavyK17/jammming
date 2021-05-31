import React from "react";
import "./PlaylistListItem.css";

export class PlaylistListItem extends React.Component {
    render() {
        return (
            <div className="Item">
                <div className="Item-information">
                    <h3>{this.props.item.name}</h3>
                </div>
            </div>
        );
    }
}