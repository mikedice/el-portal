import { makeStyles} from "@fluentui/react-components";
import { ContextualListItem } from "./ContextualListItem";
import {TreeNode} from "./TreeNode"
import {useState} from "react";

const useStyles = makeStyles({
    treeView: {
        'list-style-type': 'none',
        //'min-width': '200px'
    }
});

export default function TreeView({data}:{data:TreeNode[]}) {

    // Recursively walk the tree and create JSX. Fun!
    function createTree(data: TreeNode[]) {
        const styles = useStyles();
        var jsx = data.map((node: TreeNode) => {

            if (node.children !== undefined || (node.children ?? []).length > 0) {
                return (
                    <ContextualListItem name={node.nodeName} contextMenuItems={node.contextMenuItems}>
                        <ul className={styles.treeView}>
                            {createTree(node.children ?? [])}
                        </ul>
                    </ContextualListItem>
                );
            }
            else {
                return <ContextualListItem name={node.nodeName} contextMenuItems={node.contextMenuItems} >{ }</ContextualListItem>
            }
        });
        return jsx;
    }

    const styles = useStyles()
    return (
            <ul className={styles.treeView}>
                {createTree(data)}
            </ul>
    )
}

