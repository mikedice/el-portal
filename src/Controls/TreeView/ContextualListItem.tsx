// An LI tag with custom behaviors like context menu and maybe drag and drop some day :)
import React from 'react';
import { useState, useEffect } from 'react';
import { TreeContextMenu } from './TreeContextMenu'
import {CaretRight20Regular,CaretDown20Regular} from "@fluentui/react-icons";

// State used within this component to control show/hide of the context menu
export interface ContextMenuState {
    x: number,
    y: number,
    show: boolean,
    collapsed: boolean
}

// Used by TreeContextMenu to communicate state back to this component
// if the user selects an item from the context menu.
export interface ContextMenuSelection {
    x: number,
    y: number,
    selectedId: string,
    selectedValue: string
}

export function ContextualListItem({ children }: { children: React.ReactNode }) {
    const [contextMenuState, setShowContextMenu] = useState<ContextMenuState>({ x: 0, y: 0, show: false });
    const [contextMenuSelection, setShowContextMenuSelection] = useState<ContextMenuSelection>({ x: 0, y: 0, selectedId: "", selectedValue: "" });

    // Dismiss the context menu if the user clicks outside of it
    useEffect(() => {
        const handleClickOutside = () => {
            setShowContextMenu({ x: 0, y: 0, show: false, collapsed: false });
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
            show: false,
            collapsed: false
        });

        // if context menu was selected update the state to do something with it.
        if (contextMenuSelection.selectedId) {
            // do something with the selected item
        }
    }, [contextMenuSelection]);

    // Show the context menu and prevent the default context menu from showing
    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setShowContextMenu({ x: event.clientX, y: event.clientY, show: true, collapsed: false });
    };

    return (<li className={'contextualLi'} onContextMenu={handleContextMenu} >
        {contextMenuState.collapsed ? <span>CaretRight20Regular</span> : <span> CaretDown20Regular</span>} 
        {children}
        {contextMenuState.show &&< TreeContextMenu
            x={contextMenuState.x}
            y={contextMenuState.y}
            onSelected={setShowContextMenuSelection} />}
    </li>)

}
