import React from 'react';
import '../css/errorPage.css';

export function ErrorPage(props) {
    return <div className={`errorPage ${props.visible && 'visible'}`}>
        <div className="container">
            <h3>Ups, something wrong happened...</h3>
            <div className="cloud"/>
            <div className="eyes">
                <span></span> <span></span>
            </div>
            <div className="mouth"/>
            <div className="rain">
                <div className="rainDrop"/>
                <div className="rainDrop"/>
                <div className="rainDrop"/>
                <div className="rainDrop"/>
                <div className="rainDrop"/>
            </div>
        </div>
    </div>;
}