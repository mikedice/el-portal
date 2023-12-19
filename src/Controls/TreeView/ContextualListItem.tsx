// An LI tag with custom behaviors like context menu and maybe drag and drop some day :)
import React from 'react';
import { useState, useEffect } from 'react';
import { TreeContextMenu, TreeContextMenuItem } from './TreeContextMenu'
import { CaretRight24Regular, CaretDown24Regular } from "@fluentui/react-icons";
import { makeStyles, shorthands } from "@fluentui/react-components";
import {tokens} from '@fluentui/react-theme';

// State used within this component to control show/hide of the context menu
export interface ContextMenuState {
    x: number,
    y: number,
    show: boolean
}

// Used by TreeContextMenu to communicate state back to this component
// if the user selects an item from the context menu.
export interface ContextMenuSelection {
    x: number,
    y: number,
    selectedId: string,
    selectedValue: string
}

const useStyles = makeStyles({
    nodeExpanderLabel:{
        display: 'flex',
        ...shorthands.padding('4px')
    },
    nodeExpanderIcon:{
        ':hover':{
            cursor: 'pointer',
            backgroundColor: tokens.colorNeutralBackground1Hover,
        }
    },
    contextualListItem: {
        fontSize: tokens.fontSizeBase500
    }
});

export function ContextualListItem({ children, name, contextMenuItems }: { children: React.ReactNode, name: string, contextMenuItems?: TreeContextMenuItem[] }) {
    const [contextMenuState, setShowContextMenu] = useState<ContextMenuState>({ x: 0, y: 0, show: false });
    const [contextMenuSelection, setShowContextMenuSelection] = useState<ContextMenuSelection>({ x: 0, y: 0, selectedId: "", selectedValue: "" });
    const [collapsedState, setCollapsedState] = useState<boolean>(false);
    const styles = useStyles();

    // Dismiss the context menu if the user clicks outside of it
    useEffect(() => {
        const handleClickOutside = () => {
            setShowContextMenu({ x: 0, y: 0, show: false });
        }
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    }, []);

    // respond to changes in the menu item selection state. Basically just hide the context menu
    useEffect(() => {
        // this can be called multiple times with the initial value
        // so only change state if an actual value was selected. But,
        // always dismiss context menu.
        setShowContextMenu({
            x: 0,
            y: 0,
            show: false
        });

        // if context menu was selected update the state to do something with it.
        if (contextMenuSelection.selectedId) {
            // do something with the selected item
        }
    }, [contextMenuSelection]);

    // Show the context menu and prevent the browser's default context menu from showing
    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setShowContextMenu({ x: event.clientX, y: event.clientY, show: true });
    };

    // Toggle the expander icon
    const handleExpanderClick = (event: React.MouseEvent) => {
        event.preventDefault();
        setCollapsedState(!collapsedState);
    }

    return (

        <li className={styles.contextualListItem} onContextMenu={handleContextMenu} >
            <div className={styles.nodeExpanderLabel}>
                {/* A caret that gets toggled base on the collapsedState state variable */}
                {
                    React.Children.toArray(children).length > 0 && (
                        collapsedState ?
                            <CaretRight24Regular className={styles.nodeExpanderIcon} onClick={handleExpanderClick} />
                            : <CaretDown24Regular className={styles.nodeExpanderIcon} onClick={handleExpanderClick} />)
                }
                {/* A span that contains the name of hte LI */}
                {<span>{name}</span>}
            </div>
            {/* All the children that may or may not have been passed in */}
            {!collapsedState ? (children) : null}

            {/* The context menu that may or may not be shown */}
            {(contextMenuState.show && contextMenuItems && contextMenuItems.length > 0) && < TreeContextMenu
                x={contextMenuState.x}
                y={contextMenuState.y}
                onSelected={setShowContextMenuSelection}
                items={contextMenuItems}
            />}
        </li>)

}
