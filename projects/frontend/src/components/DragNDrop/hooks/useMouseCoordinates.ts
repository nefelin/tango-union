import {useEffect, useState} from 'react';

import {Maybe} from '../store/types';

interface MouseCoordinates {
    clientX: number;
    clientY: number;
    pageX: number;
    pageY: number;
    screenX: number;
    screenY: number;
}

const initCoordinates: MouseCoordinates = {
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    screenX: 0,
    screenY: 0,
}

const useMouseCoordinates = () => {
    const [coordinates, setCoordinates] = useState<MouseCoordinates>(initCoordinates)

    const handleMouseMove = (e: MouseEvent) => {
        const {clientX, clientY, pageX, pageY, screenX, screenY} = e;
        setCoordinates({
            clientX,
            clientY,
            pageX,
            pageY,
            screenX,
            screenY
        })
    }

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [])

    return coordinates;
}

export default useMouseCoordinates;