import { useState, useCallback } from "react";

// Toggles between true or false
function useToggle(initialValue = false) {
    const [toggle, setToggle] = useState(initialValue);

    const handleToggle = useCallback((e) => {
        e.preventDefault();
        setToggle(status => !status);
    }, []);

    return [toggle, handleToggle];
}

export default useToggle;