// An li tag with special behaviors for drag and drop
import React from 'react';
import { useState, useEffect } from 'react';
import { TreeContextMenu } from './TreeContextMenu'

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

export function ContextualListItem({ children }: { children: React.ReactNode }) {
    const [contextMenuState, setShowContextMenu] = useState<ContextMenuState>({ x: 0, y: 0, show: false });
    const [contextMenuSelection, setShowContextMenuSelection] = useState<ContextMenuSelection>({ x: 0, y: 0, selectedId: "", selectedValue: "" });

    // respond to changes in ht menu item selection state. Basically just hide the context menu
    useEffect(() => {
        // this can be called multiple times with the initial value
        // so only change state if an actual value was selected. But,
        // always dismiss context menu.
        setShowContextMenu({
            x: 0,
            y: 0,
            show: false
        });
        console.log(`context menu item selected ${JSON.stringify(contextMenuSelection)}`)
    }, [contextMenuSelection]);

    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setShowContextMenu({ x: event.clientX, y: event.clientY, show: true });
    };

    if (contextMenuState.show) {
        return (<li className={'contextualLi'} onContextMenu={handleContextMenu} >
            {children}
            <TreeContextMenu
                x={contextMenuState.x}
                y={contextMenuState.y}
                onSelected={setShowContextMenuSelection} />
        </li>)
    }
    else {
        return (<li className={'contextualLi'} onContextMenu={handleContextMenu} >
            {children}
        </li>)
    }
}
