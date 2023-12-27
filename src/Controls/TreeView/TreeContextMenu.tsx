import React from 'react';
import { ContextMenuSelection } from './ContextualListItem';
import { tokens } from '@fluentui/react-theme';
import { makeStyles, shorthands } from "@fluentui/react-components";


export interface TreeContextMenuItem {
    id: string,
    label: string,
    value: string
}

interface TreeContextMenuProps {
    x: number;
    y: number;
    nodeId: string;
    setContextMenuSelection: (selection: ContextMenuSelection) => void;
    items?: TreeContextMenuItem[];
}

const menuStyles = makeStyles({
    menu: {
        position: 'absolute',
        backgroundColor: 'white',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
        ...shorthands.padding('8px'),
        fontSize: tokens.fontSizeBase500,
        cursor: 'default'
    }
});

export const TreeContextMenu: React.FC<TreeContextMenuProps> = ({ x, y, nodeId, setContextMenuSelection, items }) => {

    const handleMenuItemClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();

        const newValue = {
            nodeId: nodeId,
            menuId: event.currentTarget.id,
            menuLabel: event.currentTarget.textContent!,
            menuValue: event.currentTarget.dataset.value ?? ''
        }
        setContextMenuSelection(newValue)
    };

    const styles = menuStyles()

    return (
        <div
            style={{
                top: y,
                left: x
            }}
            className={styles.menu}
        >
            {/* Add your context menu items here */}
            {items && items.map((item) => {
                return (
                    <div
                        id={item.id}
                        key={item.id}
                        data-value={item.value}
                        onClick={handleMenuItemClick}
                    >
                        {item.label}
                    </div>
                )
            })}
        </div>
    );
};

