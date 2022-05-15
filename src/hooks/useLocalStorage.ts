import { useState } from 'react';

const useLocalStorage = (keyName: string, defaultValue: any) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const value = window.localStorage.getItem(keyName);

            if (value) {
                return JSON.parse(value);
            } else {
                window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
                return defaultValue;
            }
        } catch (err) {
            console.log(err);
            return defaultValue;
        }
    });

    const setValue = (newValue: any) => {
        try {
            const valueToStore =
                newValue instanceof Function ? newValue(storedValue) : newValue;

            setStoredValue(valueToStore);

            window.localStorage.setItem(keyName, JSON.stringify(valueToStore));
        } catch (err) {
            console.log(err);
        }
    };

    return [storedValue, setValue];
};

export default useLocalStorage;
