import { TreeContextMenuItem } from ".";
import { TreeNode } from "./TreeNode";
import { ContextMenuSelection } from "./ContextualListItem";

// The command map maps commands from context menus by the 
// context menu's commandId to functions that mutate the tree.
// The type of tree mutation depends on the command and the needs
// of the app. If the app decides to perform a mutation of the tree
// it must return a new tree that is a copy of the old tree with
// the mutation applied. If the app decides not to do a mutation
// it must return null. The command map is passed in to the
// TreeManager constructor. Use TreeManager helpers to apply tree
// mutations to the tree
export interface ICommandMap<T> {
    [key: string]: (contextMenuItem: ContextMenuSelection, currTree: TreeNode<T>[], treeManager: TreeManager<T>) => 
        [TreeNode<T>[] | undefined, string|undefined]
}

// The TreeManager class is a helper class with helper functions for mutating a tree
// of TreeNode<T> objects. It also can map commands from a command map to functions
// in your application code that mutate the tree. The commands are typically from
// context menus. The command map is passed in to the TreeManager constructor.
export class TreeManager<T>{
    private commandMap?: ICommandMap<T>

    constructor(commandMap: ICommandMap<T> | undefined) {
        if (commandMap) this.commandMap = commandMap
    }

    public findNode(nodeId: string, tree: TreeNode<T>[]): TreeNode<T> | null {
        if (tree.length === 0) return null
        for (const node of tree) {
            if (node.id === nodeId) return node
            if (node.children && node.children.length > 0) {
                const foundNode = this.findNode(nodeId, node.children)
                if (foundNode) return foundNode
            }
        }
        return null
    }

    public addChild(node: TreeNode<T>, newEntry: TreeNode<T>, tree: TreeNode<T>[], addToFront:boolean = false): TreeNode<T>[] {
        if (!node) return tree
        if (!node.children) node.children = []
        newEntry.id = this.makeComponentId();
        addToFront ? node.children.unshift(newEntry)
                   : node.children.push(newEntry);
                   
        return this.copyTree(tree);
    }

    public updateNode(node: TreeNode<T>, tree: TreeNode<T>[]): TreeNode<T>[] {
        const newTree: TreeNode<T>[] = []
        for (const treeNode of tree) {
            if (treeNode.id === node.id) {
                newTree.push(node)
            } else {
                if (treeNode.children && treeNode.children.length > 0) {
                    treeNode.children = this.updateNode(node, treeNode.children)
                }
                newTree.push(treeNode)
            }
        }
        return newTree
    }

    public deleteNode(nodeId: string, tree: TreeNode<T>[]): TreeNode<T>[] {
        const newTree: TreeNode<T>[] = []
        for (const node of tree) {
            if (node.id !== nodeId) {
                if (node.children && node.children.length > 0) {
                    node.children = this.deleteNode(nodeId, node.children)
                }
                newTree.push(node)
            }
        }
        return newTree
    }

    public findParentNode(nodeId: string, tree: TreeNode<T>[]): TreeNode<T> | null {
        if (tree.length === 0) return null
        for (const node of tree) {
            if (node.children && node.children.length > 0) {
                for (const child of node.children) {
                    if (child.id === nodeId) return node
                }
                const foundNode = this.findParentNode(nodeId, node.children)
                if (foundNode) return foundNode
            }
        }
        return null // not found
    }

    private makeComponentId(length?: number) {
        if (!length) {
            length = 6;
        }

        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }

    public copyTree(tree: TreeNode<T>[]): TreeNode<T>[] {
        const newTree: TreeNode<T>[] = []
        for (const node of tree) {
            const newNode: TreeNode<T> = {
                id: node.id,
                nodeName: node.nodeName,
                contextMenuItems: node.contextMenuItems,
                appData: node.appData
            }
            if (node.children && node.children.length > 0) {
                newNode.children = this.copyTree(node.children)
            }

            newTree.push(newNode)
        }
        return newTree
    }

    public processCommand(menuItem: ContextMenuSelection, currTree: TreeNode<T>[]): [TreeNode<T>[] | undefined, newNodeId:string | undefined] 
    {
        // search the commandMap for a key that is equal to the commandId
        // if found, call the function that is the value of that key
        if (this.commandMap && this.commandMap[menuItem.menuId]) {
            return this.commandMap[menuItem.menuId](menuItem, currTree, this);
        }
        return [undefined, undefined];
    }

    // Create a new tree from scratch with no data in it
    public createNewTree(nodeName: string, appData: T, contextMenuItems: TreeContextMenuItem[] | undefined): TreeNode<T>[] {
        return [{
            id: this.makeComponentId(),
            nodeName: nodeName,
            appData: appData,
            contextMenuItems: contextMenuItems
        }]
    }
}