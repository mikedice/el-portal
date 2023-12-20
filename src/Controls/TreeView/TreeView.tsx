import { makeStyles} from "@fluentui/react-components";
import { ContextMenuState, ContextMenuSelection, ContextualListItem } from "./ContextualListItem";
import {TreeNode} from "./TreeNode"
import {useState, useEffect} from "react"


const useStyles = makeStyles({
    treeView: {
        'list-style-type': 'none',
        //'min-width': '200px'
    }
});

export default function TreeView({data}:{data:TreeNode[]}) {
    const [treeData, setTreeData] = useState<TreeNode[]>(data); // Keep track of tree data as state

    // The contextMenuState is lifted to the TreeView so the TreeView can control the showing of 
    // context menus on nodes within the tree. This results in prevention of more than one context
    // menu showing at a time and the dismissing of all context menus if the user clicks off a menu.
    // Requirement: all nodes in the TreeNode structure must have an ID that is unique amongst all nodes in the structure.
    const [contextMenuState, setContextMenuState] = useState<ContextMenuState>({ x: 0, y: 0, nodeId:"" });

    // The contextMenuSelection is lifted to the TreeView as the treeview is the top of the hierarchy and controls
    // the tree data. The assumption is that the context menu actions are meant to perform operations
    // on the tree's data so the Treeview is the best place to handle context menu selection
    const [contextMenuSelection, setContextMenuSelection] = useState<ContextMenuSelection>({ menuId: "", menuValue: "", menuLabel:"", nodeId:"" });

    // When a context menu item is selected the context menu will set the contextMenuSelection state
    // variable. This effect watches the contextMenuSelection state variable for changes. If change
    // is detected it dismisses all context menus and does something with the new selection
    useEffect(() => {
        // Dismiss all context menus in the tree
        setContextMenuState({ x: 0, y: 0, nodeId:"" })

        // if context menu was selected update the state to do something with it.
        if (contextMenuSelection.nodeId) {
            console.log(`Tree menu item selected: ${JSON.stringify(contextMenuSelection)}`)
        }
    }, [contextMenuSelection]);

    // Recursively walk the tree and create JSX. Fun!
    function createTree(data: TreeNode[]) {
        const styles = useStyles();
        var jsx = data.map((node: TreeNode) => {

            if (node.children !== undefined || (node.children ?? []).length > 0) {
                return (
                    <ContextualListItem name={node.nodeName} 
                        contextMenuItems={node.contextMenuItems} 
                        contextMenuState={contextMenuState}
                        setContextMenuState={setContextMenuState}
                        setContextMenuSelection={setContextMenuSelection}
                        nodeId={node.id}>
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
                    nodeId={node.id}
                    contextMenuState={contextMenuState}
                    setContextMenuState={setContextMenuState}
                    setContextMenuSelection={setContextMenuSelection}
                    children={undefined}></ContextualListItem>
            }
        });
        return jsx;
    }

    const styles = useStyles()
    return (
            <ul className={styles.treeView}>
                {createTree(treeData)}
            </ul>
    )
}

