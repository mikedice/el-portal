import { TreeContextMenuItem } from "./TreeContextMenu";

export interface TreeNode<T> {
    id?: string, // This ID must be unique amongst all nodes in the tree
    nodeName: string,
    contextMenuItems?: TreeContextMenuItem[],
    children?: TreeNode<T>[]
    appData?: T
}