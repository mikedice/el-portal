import React from 'react';
import { ContextMenuSelection } from './ContextualListItem';
import {
    makeStyles,
    shorthands
  } from "@fluentui/react-components";

interface TreeContextMenuProps {
    x: number;
    y: number;
    onSelected: (value: ContextMenuSelection) => void;
}

const menuStyles = makeStyles({
    menu:{
        position: 'absolute',
        backgroundColor: 'white',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
        ...shorthands.padding('8px')
    }
});

export const TreeContextMenu: React.FC<TreeContextMenuProps> = ({ x, y, onSelected }) => {
    const handleMenuItemClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        onSelected({x:event.clientX, y:event.clientY, selectedId: event.currentTarget.id, selectedValue:event.currentTarget.textContent!})
    };
    const styles = menuStyles()

    return (
        <div
            style={{
                top: y,
                left: x
            }}
            className={styles.menu}
            onContextMenu={handleMenuItemClick}
        >
            {/* Add your context menu items here */}
            <div onClick={handleMenuItemClick} id={'Item1'}>Item 1</div>
            <div onClick={handleMenuItemClick} id={'Item2'}>Item 2</div>
            <div onClick={handleMenuItemClick} id={'Item3'}>Item 3</div>
        </div>
    );
};

