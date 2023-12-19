import React from 'react';
import { ContextMenuSelection } from './ContextualListItem';
import {tokens} from '@fluentui/react-theme';
import {
    makeStyles,
    shorthands
  } from "@fluentui/react-components";


export interface TreeContextMenuItem{
    id: string,
    label: string,
    value: string
}

interface TreeContextMenuProps {
    x: number;
    y: number;
    onSelected: (value: ContextMenuSelection) => void;
    items?: TreeContextMenuItem[]
}

const menuStyles = makeStyles({
    menu:{
        position: 'absolute',
        backgroundColor: 'white',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
        ...shorthands.padding('8px'),
        fontSize: tokens.fontSizeBase500
    }
});

export const TreeContextMenu: React.FC<TreeContextMenuProps> = ({ x, y, onSelected, items }) => {
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
            {items && items.map((item) => {
                return (
                    <div
                        id={item.id}
                        key={item.id}
                    >
                        {item.label}
                    </div>
                )
            })}
        </div>
    );
};

