import React from "react";
import "./Track.css";

export class Track extends React.Component {
    renderAction() {
        return <button className="Track-action">{this.props.isRemoval ? "+" : "-"}</button>;
    }

    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>name</h3>
                    <p>artist | album</p>
                </div>
                {this.renderAction()}
            </div>
        );
    }
}