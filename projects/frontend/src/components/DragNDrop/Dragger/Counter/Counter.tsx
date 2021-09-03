import React from 'react';

export const Counter = () => {
    const baseSize = 22;
    const selectionCount = 6

    const SIZE = multiplierFromCharCount(selectionCount.toString().length) * baseSize;

    return <div style={{
        borderRadius: SIZE / 2,
        minWidth: SIZE,
        minHeight: SIZE,
        position: 'relative',
        backgroundColor: 'red',
        color: 'white',
        fontWeight: 'bold',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }}>{selectionCount}</div>
}

const multiplierFromCharCount = (count: number): number => {
    switch (count) {
        case 1:
            return 1;
        case 2:
            return 1.3;
        case 3:
        default:
            return 1.6;
    }
}