import {TreeItem} from "./TreeItem"
import {
    makeStyles,
  } from "@fluentui/react-components";

import { useState } from "react";
import { DroppableListItem } from "./DroppableListItem";
import { ContextualListItem } from "./ContextualListItem";

const useStyles = makeStyles({
    treeView: {
        'list-style-type': 'none',
        //'min-width': '200px'
    }
});

interface NodeExpanderProps{
    expanded:boolean,
    nodeName:string
}

interface TreeNode
{
    id:number,
    nodeName:string,
    children?: TreeNode[]
}



export default function TreeView() 
{
    // Test Data
    const data: TreeNode[] =[
            {
                id: 1,
                nodeName: "node1",
                children:[
                    {
                        id: 3,
                        nodeName: "node3",
                        children: [
                            {
                                id: 1,
                                nodeName: "item3.1"
                            },
                            {
                                id: 2,
                                nodeName: "item3.2"
                            }
                        ],
                    },
                    {
                        id: 4,
                        nodeName: "node4",
                        children: [
                            {
                                id: 1,
                                nodeName: "item4.1"
                            },
                            {
                                id: 2,
                                nodeName: "item4.2"
                            }
                        ],
                    }
                ],
            }
        ]


    
    // Recursively walk the tree and create JSX. Fun!
    function createTree(data: TreeNode[]) {
        const styles = useStyles();
        var jsx = data.map((node: TreeNode) => {
            
            if (node.children !== undefined || (node.children ?? []).length > 0) {
                return (
                    <ContextualListItem>{node.nodeName}
                        <ul className={styles.treeView}>
                            {createTree(node.children ?? [])}
                        </ul>
                    </ContextualListItem>
                );
            }
            else{
                return <ContextualListItem>{node.nodeName}</ContextualListItem>
            }

        });
        return jsx;
    }

    const styles = useStyles()
    return (
    
        <>
        <ul className={styles.treeView}>
            {createTree(data)}      
        </ul>
        {/*
            Originally learned from https://www.w3schools.com/howto/howto_js_treeview.asp

            <ul id="myUL">
                <li><span className="caret">Beverages</span>
                    <ul className="nested">
                    <li>Water</li>
                    <li>Coffee</li>
                    <li><span className="caret">Tea</span>
                        <ul className="nested">
                        <li>Black Tea</li>
                        <li>White Tea</li>
                        <li><span className="caret">Green Tea</span>
                            <ul className="nested">
                            <li>Sencha</li>
                            <li>Gyokuro</li>
                            <li>Matcha</li>
                            <li>Pi Lo Chun</li>
                            </ul>
                        </li>
                        </ul>
                    </li>
                    </ul>
                </li>
            </ul>
        */}
        </>
    )
}

