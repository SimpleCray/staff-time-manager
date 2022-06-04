import { faCheckSquare, faInfoCircle, faTimes, faTriangleExclamation, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearMessage, showMessage } from '../../redux/message/message.actions';
import { COLOR_CONST } from '../../shared/constants';

const messageType: any = {
    error: {
        background: COLOR_CONST.ERROR,
        icon: faInfoCircle,
    },
    warning: {
        background: COLOR_CONST.WARNING,
        icon: faTriangleExclamation,
    },
    info: {
        background: COLOR_CONST.INFO,
        icon: faInfoCircle,
    },
    success: {
        background: COLOR_CONST.SUCCESS,
        icon: faCheckSquare,
    },
};

const Message = () => {
    const dispatch = useDispatch();
    const { message, variant, duration } = useSelector((state: any) => state.message);

    useEffect(() => {
        let timer = setTimeout(() => onClear(), duration);
        return () => clearTimeout(timer);
    }, [message]);

    const onClear = () => {
        dispatch(clearMessage());
    }

    return message && variant ? (
        <div className='message-container' style={{ background: messageType[variant].background }}>
            <FontAwesomeIcon icon={messageType[variant].icon} style={{ margin: '0 10px 0 20px', fontSize: 22 }} />
            {message}
            <FontAwesomeIcon icon={faTimes} style={{ position: 'absolute', right: 20, fontSize: 22, cursor: 'pointer' }} onClick={onClear}/>
        </div>
    ) : null;
};

export default Message;
