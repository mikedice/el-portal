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
    [key: string]: (contextMenuItem: ContextMenuSelection, currTree: TreeNode<T>, treeManager: TreeManager<T>) => 
        [TreeNode<T> | undefined, string|undefined]
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

    public findNode(nodeId: string, tree: TreeNode<T>): TreeNode<T> | null {
        // recursively search the tree for a node with the given id and return that node if found
        if (tree.id === nodeId) return tree
        if (tree.children && tree.children.length > 0) {
            for (const child of tree.children) {
                const foundNode = this.findNode(nodeId, child)
                if (foundNode) return foundNode
            }
        }
        return null
    }


    // Add newEntry as a childNode of node in the tree. If addToFront is true, add to the front of the children array
    // otherwise add to the end of the children array. Return a new copy of the modified tree.
    public addChild(node: TreeNode<T>, newEntry: TreeNode<T>, tree: TreeNode<T>, addToFront:boolean = false): TreeNode<T> {
        if (!node) return tree
        if (!node.children) node.children = []
        newEntry.id = this.makeComponentId();
        addToFront ? node.children.unshift(newEntry)
                   : node.children.push(newEntry);
                   
        return this.copyTree(tree);
    }

    // find node in the tree matching by node.id and if the node is found copy the new node's data into the found node.
    // Return a new copy of the modified tree.
    public updateNode(node: TreeNode<T>, tree: TreeNode<T>): TreeNode<T> {
        if (!node) return tree
        const foundNode = this.findNode(node.id ?? "", tree)
        if (foundNode) {
            foundNode.nodeName = node.nodeName;
            foundNode.appData = node.appData;
            foundNode.contextMenuItems = Array.from(node.contextMenuItems ?? []);
            foundNode.children = Array.from(node.children ?? []);
        }
        return this.copyTree(tree)

    }

    // find the parent node of the node with nodeId in the tree and delete the node with nodeId from the parent's children array.
    public deleteNode(nodeId: string, tree: TreeNode<T>): TreeNode<T> {
        const parentNode = this.findParentNode(nodeId, tree)
        if (parentNode) {
            const newChildren = parentNode.children?.filter((child) => child.id !== nodeId)
            if (newChildren) {
                parentNode.children = newChildren
            }
        }
        return this.copyTree(tree)

    }

    // find the parent node of the node with nodeId in the tree and return the parent node.
    public findParentNode(nodeId: string, tree: TreeNode<T>): TreeNode<T> | null {
        if (tree.children && tree.children.length > 0) {
            for (const child of tree.children) {
                if (child.id === nodeId) return tree
                const foundNode = this.findParentNode(nodeId, child)
                if (foundNode) return foundNode
            }
        }
        return null;
    }

    // Create a random string of characters of length length
    private makeComponentId(length?: number): string {
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

    // Copy every node of tree to a new tree and return the new tree
    public copyTree(tree: TreeNode<T>): TreeNode<T> {
        const newTree: TreeNode<T> = {
            id: tree.id,
            nodeName: tree.nodeName,
            appData: tree.appData,
            contextMenuItems: Array.from(tree.contextMenuItems ?? []),
            children: []
        }

        if (tree.children && tree.children.length > 0) {
            tree.children.forEach((child) => {
                if (newTree.children) newTree.children.push(this.copyTree(child))
            })
        }
        return newTree
    }

    public processCommand(menuItem: ContextMenuSelection, currTree: TreeNode<T>): [TreeNode<T> | undefined, newNodeId:string | undefined] 
    {
        // search the commandMap for a key that is equal to the commandId
        // if found, call the function that is the value of that key
        if (this.commandMap && this.commandMap[menuItem.menuId]) {
            return this.commandMap[menuItem.menuId](menuItem, currTree, this);
        }
        return [undefined, undefined];
    }

    // Create a new tree from scratch with no data in it
    public createNewTree(nodeName: string, appData: T, contextMenuItems: TreeContextMenuItem[] | undefined): TreeNode<T> {
        return {
            id: this.makeComponentId(),
            nodeName: nodeName,
            appData: appData,
            contextMenuItems: contextMenuItems
        };
    }
}