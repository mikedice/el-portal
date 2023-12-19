
import './App.css'
import TreeView from './Controls/TreeView/TreeView'
import {TestData} from './Controls/TreeView/TestData'

function App() {
  return (
    <>
      <h1>El Portal Controls</h1>
      <h2>Tree control</h2>
      <div>
        <TreeView data={TestData}></TreeView>
      </div>
    </>
  )
}

export default App
