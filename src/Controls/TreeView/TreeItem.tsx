
export interface TreeItemProps{
    id: number
    value: string
}


export function TreeItem(props:TreeItemProps){
    return <li>{props.value}</li>
}