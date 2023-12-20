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
    nodeId: string
}

// Used by TreeContextMenu to communicate state back to this component
// if the user selects an item from the context menu.
export interface ContextMenuSelection {
    menuId: string,
    menuValue: string
    menuLabel: string
    nodeId: string
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

export function ContextualListItem({ children, name, nodeId, contextMenuItems, contextMenuState, setContextMenuState, setContextMenuSelection}: 
    { children: React.ReactNode, 
        name: string, 
        nodeId: string, 
        contextMenuItems?: TreeContextMenuItem[],
        contextMenuState: ContextMenuState
        setContextMenuState: (state: ContextMenuState)=>void,
        setContextMenuSelection: (selection:ContextMenuSelection)=>void
    }) {

    const [collapsedState, setCollapsedState] = useState<boolean>(false);
    const styles = useStyles();

    function dismissContextMenus(){
        setContextMenuState({...contextMenuState, nodeId:""});
    }

    // Dismiss the context menu if the user clicks outside of it
    useEffect(() => {
        const handleClickOutside = () => {
            dismissContextMenus();
        }
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    }, []);



    // Show the context menu and prevent the browser's default context menu from showing
    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();

        // The parent TreeView is notified of a new context menu about to be shown. This gives
        // the parent Treeview a chance to dismiss any currently open context menus in the tree
        if (contextMenuItems && contextMenuItems.length > 0){
            dismissContextMenus()
        }
        setContextMenuState({ x: event.clientX, y: event.clientY, nodeId: nodeId });
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
            {(contextMenuState.nodeId == nodeId && contextMenuItems && contextMenuItems.length > 0) && < TreeContextMenu
                x={contextMenuState.x}
                y={contextMenuState.y}
                nodeId={nodeId}
                setContextMenuSelection={setContextMenuSelection}
                items={contextMenuItems}
            />}
        </li>)

}
