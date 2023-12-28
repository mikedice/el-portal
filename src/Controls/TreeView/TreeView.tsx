import { makeStyles } from "@fluentui/react-components";
import { ContextMenuState, ContextMenuSelection, ContextualListItem } from "./ContextualListItem";
import { TreeNode } from "./TreeNode"
import { useState, useEffect } from "react"


const useStyles = makeStyles({
    treeView: {
        'list-style-type': 'none',
        //'min-width': '200px'
    }
});

export default function TreeView<T>({ appData, setAppContextMenuSelection, setAppSelection }: 
    {
        appData: TreeNode<T>[], 
        setAppContextMenuSelection: (selection:ContextMenuSelection)=>void
        setAppSelection: (selection: string) => void
    })
    {
    // The contextMenuState is lifted to the TreeView so the TreeView can control the showing of 
    // context menus on nodes within the tree. This results in prevention of more than one context
    // menu showing at a time and the dismissing of all context menus if the user clicks off a menu.
    // Requirement: all nodes in the TreeNode structure must have an ID that is unique amongst all nodes in the structure.
    const [contextMenuState, setContextMenuState] = useState<ContextMenuState>({ x: 0, y: 0, nodeId: "" });

    // The contextMenuSelection is lifted to the TreeView as the treeview is the top of the view hierarchy.
    // The treeview needs to respond to selection by dismissing all open context menus within the tree and
    // then it needs to let the app know that a context menu item was selected.
    const [contextMenuSelection, setContextMenuSelection] = useState<ContextMenuSelection>({ menuId: "", menuValue: "", menuLabel: "", nodeId: "" });

    // The selected item is lifted to the TreeView as the treeview is the top of the view hierarchy.
    // The selected item represents the node in the tree that was selected by the user. The treeview
    const [selectedItem, setSelectedItem] = useState<string>("");

    // When a context menu item is selected the context menu will set the contextMenuSelection state
    // variable. This useEffect watches the contextMenuSelection state variable for changes. If change
    // is detected it dismisses all context menus and does something with the new selection
    useEffect(() => {
        // Dismiss all context menus in the tree
        setContextMenuState({ x: 0, y: 0, nodeId: "" })

        // if context menu was selected update the state to do something with it.
        if (contextMenuSelection.nodeId) {
            setAppContextMenuSelection(contextMenuSelection)
        }
    }, [contextMenuSelection]);

    useEffect(() => {
        // A node in the tree was selected notify the app by setting it's selected item state
        setAppSelection(selectedItem)
    }, [selectedItem]);

    const styles = useStyles();

    // Recursively walk the tree and create JSX. Fun!
    function createTree(data: TreeNode<T>[]) {

        var jsx = data.map((node: TreeNode<T>) => {

            if (node.children !== undefined || (node.children ?? []).length > 0) {
                return (
                    <ContextualListItem name={node.nodeName}
                        contextMenuItems={node.contextMenuItems}
                        contextMenuState={contextMenuState}
                        setContextMenuState={setContextMenuState}
                        setContextMenuSelection={setContextMenuSelection}
                        nodeId={node.id ?? ""}
                        key={node.id}
                        selectedItem={selectedItem}
                        setSelectedItem={setSelectedItem}>
                        <ul className={styles.treeView}>
                            {createTree(node.children ?? [])}
                        </ul>
                    </ContextualListItem>
                );
            }
            else {
                return <ContextualListItem
                    name={node.nodeName}
                    contextMenuItems={node.contextMenuItems}
                    nodeId={node.id ?? ""}
                    contextMenuState={contextMenuState}
                    setContextMenuState={setContextMenuState}
                    setContextMenuSelection={setContextMenuSelection}
                    key={node.id}
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                    children={undefined}></ContextualListItem>
            }
        });
        return jsx;
    }
  
    return (
        <ul className={styles.treeView}>
            {createTree(appData)}
        </ul>
    )
}

