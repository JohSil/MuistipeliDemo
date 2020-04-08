import React from "react";
import ReactCardFlip from "react-card-flip";
//https://www.npmjs.com/package/react-card-flip

export default function Card(props) {
    return (
        <ReactCardFlip isFlipped={props.isFlipped} flipSpeedBackToFront={0.5} flipSpeedFrontToBack={0.5}>
            <div id={props.id} type={props.cardNumber} className={"card back"}  onClick={props.onClick}/>
            <div id={props.id} type={props.cardNumber} className={"card front"}>
                <span>{props.cardNumber}</span>
            </div>
        </ReactCardFlip>
    );
}