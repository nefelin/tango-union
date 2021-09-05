import { useReactiveVar } from '@apollo/client';
import React from 'react';

import { reactiveSongLists } from '../../../../hooks/state/useGlobalPlaylistState/songLists.state';
import { reactiveActivePlaylistId, useSelectionState } from '../../../../hooks/state/useSelectionState';

export const Counter = () => {
    const activePlaylistId = useReactiveVar(reactiveActivePlaylistId)
    const songLists = useReactiveVar(reactiveSongLists)
    const count = songLists[activePlaylistId ?? 'nope']?.selection.size ?? 0;
    const baseSize = 22;

    const SIZE = multiplierFromCharCount(count.toString().length) * baseSize;

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
    }}>{count}</div>
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