import { TreeNode } from "./TreeNode"

export const TestData: TreeNode<number>[] = [
    {
        id: "1",
        nodeName: "node1",
        contextMenuItems: [
            {
                id: "item1",
                value: "item 1",
                label: "item 1"
            }
        ],
        children: [
            {
                id: "2",
                nodeName: "node3",
                contextMenuItems: [
                    {
                        id: "item3",
                        value: "item 3",
                        label: "item 3"
                    }
                ],
                children: [
                    {
                        id: "3",
                        nodeName: "item3.1",
                        contextMenuItems: []
                    },
                    {
                        id: "4",
                        nodeName: "item3.2"
                    }
                ],
            },
            {
                id: "5",
                nodeName: "node4",
                contextMenuItems: [
                    {
                        id: "item4",
                        value: "item 4",
                        label: "item 4"
                    }
                ],
                children: [
                    {
                        id: "6",
                        nodeName: "item4.1",
                        contextMenuItems: [
                            {
                                id: "item4.1",
                                value: "item 4.1",
                                label: "item 4.1"
                            }
                        ],
                    },
                    {
                        id: "7",
                        nodeName: "item4.2"
                    }
                ],
            }
        ],
    }
]
