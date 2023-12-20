import { TreeContextMenuItem } from "./TreeContextMenu";

export interface TreeNode {
    id: string, // This ID must be unique amongst all nodes in the tree
    nodeName: string,
    contextMenuItems?: TreeContextMenuItem[],
    children?: TreeNode[]
}