
import './App.css'
import TreeView from './Controls/TreeView/TreeView'
import { TestData } from './Controls/TreeView/TestData'
import { useState } from 'react'
import { TreeNode } from './Controls/TreeView/TreeNode'
import { ContextMenuSelection } from './Controls/TreeView/ContextualListItem'
import { useEffect } from 'react'

function App() {
  // The app keeps track of the tree data used by the tree view
  const [treeData /*, setTreeData*/] = useState<TreeNode[]>(TestData); // Keep track of tree data as state

  // The app keeps a state property that is modified when a context menu is selected. The app would
  // usually monitor changes to this variable and perform an app specific action in response.
  const [contextMenuSelection, setContextMenuSelection] = useState<ContextMenuSelection>({ menuId: "", menuValue: "", menuLabel: "", nodeId: "" });

  useEffect(() => {
    if (contextMenuSelection.nodeId) {
      console.log(`App Tree menu item selected: ${JSON.stringify(contextMenuSelection)}`)
    }
  }, [contextMenuSelection]);

  return (
    <>
      <h1>El Portal Controls</h1>
      <h2>Tree control</h2>
      <div>
        <TreeView appData={treeData}
          setAppContextMenuSelection={setContextMenuSelection}></TreeView>
      </div>
    </>
  )
}

export default App
