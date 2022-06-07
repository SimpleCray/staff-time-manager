import React from 'react';

interface TooltipProps {
    children: React.ReactElement;
    content: string;
    position: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ children, content, position = 'top' }) => {
    const [show, setShow] = React.useState(false);
    return (
        <div className='tooltip' onMouseOver={() => setShow(true)} onMouseLeave={() => setShow(false)}>
            {show && <div className={`tooltip-content ${position}`}>{content}</div>}
            {children}
        </div>
    );
};
