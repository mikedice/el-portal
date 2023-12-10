import React from 'react';
import { ContextMenuSelection } from './ContextualListItem';

interface TreeContextMenuProps {
    x: number;
    y: number;
    onSelected: (value: ContextMenuSelection) => void;
}

export const TreeContextMenu: React.FC<TreeContextMenuProps> = ({ x, y, onSelected }) => {
    const handleMenuItemClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        onSelected({x:event.clientX, y:event.clientY, selectedId: event.currentTarget.id, selectedValue:event.currentTarget.textContent!})
    };

    return (
        <div
            style={{
                position: 'absolute',
                top: y,
                left: x,
                backgroundColor: 'white',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                padding: '8px',
            }}
            onContextMenu={handleMenuItemClick}
        >
            {/* Add your context menu items here */}
            <div onClick={handleMenuItemClick} id={'Item1'}>Item 1</div>
            <div onClick={handleMenuItemClick} id={'Item2'}>Item 2</div>
            <div onClick={handleMenuItemClick} id={'Item3'}>Item 3</div>
        </div>
    );
};

