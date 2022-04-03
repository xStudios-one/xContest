import { useEffect, useRef } from 'react';

const useDidMount = (func: () => void, deps: any[]): void => {
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current) func();
        else didMount.current = true;
    }, deps);
}

export default useDidMount;