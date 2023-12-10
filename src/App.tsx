import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TreeView from './Controls/TreeView/TreeView'

function App() {
  return (
    <>
      <h1>El Portal Controls</h1>
      <h2>Tree control</h2>
      <div>
        <TreeView></TreeView>
      </div>
    </>
  )
}

export default App
