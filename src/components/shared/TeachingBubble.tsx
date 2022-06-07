import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef } from 'react';
import useOnClickOutside from '../../hook/useOnClickOutside';

interface TooltipProps {
    children: React.ReactElement;
    content: React.ReactElement;
    position: string;
    hasCloseButton: boolean;
}

export const TeachingBubble: React.FC<TooltipProps> = ({ children, content, position = 'bottom', hasCloseButton }) => {
    const [show, setShow] = React.useState(false);
    const ref: any = useRef();
    useOnClickOutside(ref, () => (hasCloseButton ? false : setShow(false)));
    return (
        <div className='tooltip' onClick={() => (!show ? setShow(true) : false)} ref={ref}>
            {show && (
                <div className={`tooltip-content ${position} small-shadow`}>
                    {hasCloseButton && (
                        <div className='close-tooltip'>
                            <FontAwesomeIcon className='close-tooltip-icon' icon={faTimes} onClick={() => setShow(false)} />
                        </div>
                    )}
                    {content}
                </div>
            )}
            {children}
        </div>
    );
};
