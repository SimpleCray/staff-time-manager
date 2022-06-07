import React, { MouseEventHandler } from "react";

type props = {
    toggle: boolean;
    onClick: MouseEventHandler;
    LeftIcon: React.JSXElementConstructor<any>;
    RightIcon: React.JSXElementConstructor<any>
    onMouseOver: MouseEventHandler;
    styles: any;
}

const ToggleButton = ({ toggle, onClick, LeftIcon, RightIcon, onMouseOver, styles }: props) => {
    return (
        <div onClick={onClick} className='toggle-button-container' style={{...styles}}>
            <div className='toggle-switch' style={{transform: toggle ? 'translate(51%, 0)' : 'translate(-51%, 0)'}}/>
            <div className='toggle-children'><LeftIcon/></div>
            <div className='toggle-children'><RightIcon/></div>
        </div>
    );
}

export default ToggleButton;