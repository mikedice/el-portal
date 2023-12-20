// An li tag with special behaviors for drag and drop

import React from 'react';
import { useState } from 'react';

/* Not used at this time */
export function DroppableListItem({ children }: { children: React.ReactNode }) {
    const [isDragOver, setIsDragOver] = useState(false);

    function addDropIndicator(event: React.DragEvent<HTMLLIElement>) {
        if (
            document.elementFromPoint(event.clientX, event.clientY) === event.currentTarget) {
            setIsDragOver(true)
        }
        else {
            setIsDragOver(false);
        }
    }
    const handleDragOver = (event: React.DragEvent<HTMLLIElement>) => {
        event.preventDefault();
        console.log(event.currentTarget.value);
        // setIsDragOver(true);
        addDropIndicator(event)
    };

    const handleDragLeave = (event: React.DragEvent<HTMLLIElement>) => {
        event.preventDefault();
        //setIsDragOver(false);
        addDropIndicator(event);
    };

    const handleDrop = (event: React.DragEvent<HTMLLIElement>) => {
        event.preventDefault();
        //addDropIndicator(event);

        // Access the drag data from the event
        const draggedData = event.dataTransfer.getData('text/plain');

        // Create a new child element based on the drag data
        const newChildElement = <div>{draggedData}</div>;

        // Perform any additional logic with the new child element
        // ...

        // Append the new child element to the existing children
        const updatedChildren = React.Children.toArray(children);
        updatedChildren.push(newChildElement);

        // Update the state with the updated children
        // ...
    };

    return (
        <li
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{ borderBottom: isDragOver ? '2px solid black' : 'none' }}
        >
            {children}
        </li>
    );
}