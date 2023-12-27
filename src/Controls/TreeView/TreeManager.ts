import { TreeNode } from "./TreeNode";

export class TreeManager{
    public Commands = {
        AddSection: {
            id: "addSection",
            function: (nodeId: string, currTree: TreeNode[]): TreeNode[] => {
                console.log(`Add Section command called for node ${nodeId}`)
                const newTree = this.addSection(nodeId, currTree)
                return newTree;
            }
        }
    }

    private findNode (nodeId: string, tree:TreeNode[]): TreeNode | null{
        if (tree.length === 0) return null
        for (const node of tree){
            if (node.id === nodeId) return node
            if (node.children && node.children.length > 0){
                const foundNode = this.findNode(nodeId, node.children)
                if (foundNode) return foundNode
            }
        }
        return null
    }

    private addSection(nodeId: string, tree:TreeNode[]): TreeNode[]{
        const node = this.findNode(nodeId, tree)
        if (!node) return tree
        const newSection = {
            id: this.makeComponentId(),
            nodeName: 'Section',
            contextMenuItems: [
                {
                    id: "addSection",
                    value: "Add Section",
                    label: "add Section"
                }
            ],
        }
        if (!node.children) node.children = []
        node.children.push(newSection)
        return this.copyTree(tree);
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

    private copyTree(tree: TreeNode[]): TreeNode[]{
        const newTree: TreeNode[] = []
        for (const node of tree){
            const newNode: TreeNode = {
                id: node.id,
                nodeName: node.nodeName,
                contextMenuItems: node.contextMenuItems
            }
            if (node.children && node.children.length > 0){
                newNode.children = this.copyTree(node.children)
            }
            newTree.push(newNode)
        }
        return newTree
    }

    public processCommand(commandId: string, nodeId: string, currTree: TreeNode[]):TreeNode[]|null{
        var newTree: TreeNode[] | null = null;

        switch (commandId){
            case this.Commands.AddSection.id:
                newTree = this.Commands.AddSection.function(nodeId, currTree)
                break
            default:
                console.log(`Unknown command ${commandId}`)
        }
        return newTree;
    }

    // Create a new tree from scratch with no data in it
    public createNewTree(): TreeNode[]{
        const id = this.makeComponentId()
        return [{
            id: id,
            nodeName: 'Document',
            contextMenuItems: [
                {
                    id: "addSection",
                    value: "Add Section",
                    label: "add Section"
                }
            ],
        }]
    }
}