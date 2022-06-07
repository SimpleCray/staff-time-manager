import { useState } from 'react';

const useBoolean = (value: boolean) => {
    const [boolean, setBoolean] = useState(value);
    const toggle = () => setBoolean((state) => !state);
    return [boolean, toggle];
};

export default useBoolean;
