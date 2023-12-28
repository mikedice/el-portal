
import './App.css'
import TreeView from './Controls/TreeView/TreeView'
import { useState } from 'react'
import { TreeNode } from './Controls/TreeView/TreeNode'
import { ContextMenuSelection } from './Controls/TreeView/ContextualListItem'
import { useEffect } from 'react'
import { TreeManager, ICommandMap } from './Controls/TreeView/TreeManager'

// The context menu command map
const commands: ICommandMap<number> = {
  addSection: createNewSection,
  deleteSection: deleteSection,
};

// Context Menu Handlers
function createNewSection(command: ContextMenuSelection, currTree: TreeNode<number>[]): TreeNode<number>[] | undefined {
  const node = treeManager.findNode(command.nodeId, currTree);
  if (node) {
    const newNode: TreeNode<number> = {
      nodeName: "section",
      appData: 0,
      contextMenuItems: [
        {
          id: "addSection",
          value: "Add Section",
          label: "Add Section"
        },
        {
          id: "deleteSection",
          value: "Delete Section",
          label: "Delete Section"
        }
      ],
    };
    return treeManager.addChild(node, newNode, currTree);
  }
  return undefined;
}

function deleteSection(command: ContextMenuSelection, currTree: TreeNode<number>[]): TreeNode<number>[] | undefined {
  const node = treeManager.findNode(command.nodeId, currTree);
  if (node) {
    return treeManager.deleteNode(node.id!, currTree);
  }
  return undefined;
}

// The tree manager that handles operations on the data renderd by TreeView
const treeManager = new TreeManager<number>(commands);

function App() {
  // The application must keep track of the tree data used by the tree view as React state
  const [treeData, setTreeData] = useState<TreeNode<number>[]>(treeManager.createNewTree('Document', 0, [
    {
      id: "addSection",
      value: "Add Section",
      label: "add Section"
    }]));

  // The app keeps a state property that is modified when a context menu item is selected. The app would
  // usually monitor changes to this variable and perform an app specific action in response.
  const [contextMenuSelection, setContextMenuSelection] = useState<ContextMenuSelection>({ menuId: "", menuValue: "", menuLabel: "", nodeId: "" });

  // The app keeps a state property that is modified when a tree node is selected. The app would
  // usually monitor changes to this variable and perform an app specific action in response.
  const [selectedItem, setSelectedItem] = useState<string>("");

  // The app monitors changes to the context menu selection and performs an action based on the
  // menu item selected.
  useEffect(() => {
    if (contextMenuSelection.nodeId) {
      console.log(`App Tree menu item selected: ${JSON.stringify(contextMenuSelection)}`)

      // Use the tree manager to process the command via your command map. If the 
      // processing of the command results in an update to the tree data, TreeView's view
      // of the data is updated with the setTreeData() function which causes React to 
      // re-render the TreeView component.
      const newTree = treeManager.processCommand(contextMenuSelection, treeData);
      if (newTree) setTreeData(newTree);
    }
  }, [contextMenuSelection]);

  // Montioring for changes to the selected item state. If the selected item changes
  // the app can do something with it.
  useEffect(() => {
    if (selectedItem === "") return;

    const node = treeManager.findNode(selectedItem, treeData);
    if (node)
    {
      console.log(`App Tree node selected: ${node.nodeName}`);
      // TODO: need to do something with the selected node
    }

  }, [selectedItem]);

  return (
    <>
      <h1>El Portal Controls</h1>
      <h2>Tree control</h2>
      <div>
        <TreeView appData={treeData}
          setAppContextMenuSelection={setContextMenuSelection}
          setAppSelection={setSelectedItem}></TreeView>
      </div>
    </>
  )
}

export default App
