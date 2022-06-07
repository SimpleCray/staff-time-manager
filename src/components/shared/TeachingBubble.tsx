import React, { useRef } from 'react';
import useOnClickOutside from '../../hook/useOnClickOutside';

interface TooltipProps {
    children: React.ReactElement;
    content: React.ReactElement;
    position: string;
}

export const TeachingBubble: React.FC<TooltipProps> = ({ children, content, position = 'bottom' }) => {
    const [show, setShow] = React.useState(false);
    const ref:any = useRef();
    useOnClickOutside(ref, () => setShow(false));
    return (
        <div className='tooltip' onClick={() => setShow(true)} ref={ref}>
            {show && <div className={`tooltip-content ${position}`}>{content}</div>}
            {children}
        </div>
    );
};
