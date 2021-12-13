import React from 'react';

export const GlobalFilter = ({ filter, setFilter }) => {
    return (
        <span>
            Search: {' '}
            <input value={filter || ''}
                    onChange={event => setFilter(event.target.value)}/>
        </span>
    )
}