import { TreeContextMenuItem } from "./TreeContextMenu";

export interface TreeNode {
    id: number,
    nodeName: string,
    contextMenuItems?: TreeContextMenuItem[],
    children?: TreeNode[]
}