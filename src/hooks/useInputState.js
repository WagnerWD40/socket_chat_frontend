import { useState } from 'react';

export default initialval => {
    const [ value, setValue ] = useState(initialval);

    const handleChange = e => setValue(e.target.value);

    const reset = () => setValue('');

    return [ value, handleChange, reset ];
};