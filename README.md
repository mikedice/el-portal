# El-Portal
## React components based on Fluent UI React V9

The components in this repository are UI components that are based on Microsoft Fluent UI React V9 components.

Currrent list of Components
* TreeView: This components organizes data into a tree. The tree has expanders to expand or collapse branches. It also has context menu capability so each node in the tree can display an optional context menu.

This project was started using Vite which is a packge that creates projects based on templates. It does way more than that but I am just a humble newbie to Vite so I don't know all the details. If you want to learn all about Vite you can review the [Vite website](https://vitejs.dev/).
I used this command to bootstrap this project: ```npm create vite@latest el-portal -- --template react-ts```

### FAQ
**Why base on Fluent UI?** Because Fluent UI comes with resources I need. Especially a vast library of icons and fonts that look nice on the platform where the code runs. Fluent UI React also keeps style in code with the component by using Griffel. I enjoy using this pattern and it is easy to use from Fluent UI React. Lastly, I'm planning on using these components from Fluent UI based projects so using Fluent UI React in this project makes it easier. Learn more about Fluent UI React from the [Fluent UI React V9 website](https://react.fluentui.dev/?path=/docs/concepts-introduction--page)

**Why not use create-react-app?** This tool is no longer being maintained. I started getting dependency errors from the tool generated code on deployment so I abandoned it.

**Why TypeScript?** Because it makes you write better code and it is fun

**Why you have so many comments in your code?** Because I don't get to work on this project that often. I work on many other things. The heavy commenting helps me swap what I was doing and why I made decisions I made back into my brain faster. They don't hurt the production build at all.


## How to use
1. Install NodeJS and NPM. I am currently using node v18.18.2 and npm 9.8.1
1. Clone the repo
1. Change directory into the directory that contains the repo you just cloned
1. ```npm install```
1. ```npm run dev```

## Build and use el-portal as a library
1. Install NodeJS and NPM. I am currently using node v18.18.2 and npm 9.8.1
1. Clone the repo
1. Change directory into the directory that contains the repo you just cloned
1. Run the command `npm run build`. This command will produce a ```.\dist directory```
1. Currently you have to 'statically link' this library as it is not published to NPM yet
1. Still in the root directory run the command ```npm link```. This will create a file system link to this directory in the global npm packages directory
1. Go to the root of the target project where you wish to consume the el-portal package. Run the command ```npm link el-portal```
1. In your TS code you should now be able to import TreeView and TreeNode

## Code needed in the application
The application is responsible for maintaining the data tree that is rendered by the TreeView. In that respect
the application would call the react useState function to set up a state variable and setter for the data tree.
The data tree itself is a tree of TreeNode objects. Each node can have a collection of TreeContextMenuItem objects.
If the node does have a TreeContextMenuItem collection then when a context menu is invoked on a node, for example 
by right clicking on the node, the items in the TreeContextMenuItem collection are displayed as a context menu.
The app will want to respond to the user clicking on a context menu item in some way. The selected context menu item
is stored as a state variable created using the react useState API. The state variable's setter is passed down
to the TreeView which will respond to context menu selections and call the setter with the new selection if a 
selection is made. Apps, will likely perform some kind of app specific action in response to a context menu 
item being selected. The app can use the react useEffect API to monitor the context menu state variable and perform
some app specific action in response. Here is a sample
```
export default function DDUEDocument() {
// The tree data in this case represents a document as a tree
const [treeData /*, setTreeData*/] = useState<TreeNode[]>(TestData); // Keep track of tree data as state

// The app keeps a state property that is modified when a context menu is selected. The app would
// usually monitor changes to this variable and perform an app specific action in response.
const [contextMenuSelection, setContextMenuSelection] = useState<ContextMenuSelection>({ menuId: "", menuValue: "", menuLabel: "", nodeId: "" });

// The useEffect API is used to respond to context menu selections from within the tree
useEffect(() => {
if (contextMenuSelection.nodeId) {
    // TODO: do some app specific thing at this point. A context menu item was selected.
    console.log(`App Tree menu item selected: ${JSON.stringify(contextMenuSelection)}`)
}
}, [contextMenuSelection]);

// rest of app code follows....
}
```


## Contact ##
Have questions? Here is my contact information:
* Personal email [mikedice417@hotmail.com](mailto:mikedice417@hotmail.com) 
* Professional email [mikedice@microsoft.com](mailto:mikedice@microsoft.com)
* [GitHub](https://github.com/mikedice)
* [Linked In](https://www.linkedin.com/in/mikedice)