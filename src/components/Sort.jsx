import SortableList, { SortableItem } from 'react-easy-sort'
import { useState } from 'react'
import { arrayMoveImmutable } from 'array-move'
import '../styles/sort.css'


export default function App(){
  const [items, setItems] = useState(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'])

  const onSortEnd = (oldIndex, newIndex) => {
    setItems((array) => arrayMoveImmutable(array, oldIndex, newIndex))
  }

  return (
    <SortableList onSortEnd={onSortEnd} className="list" draggedItemClassName="dragged">
      {items.map((item) => (
        <SortableItem key={item}>
          <div className="item">{item}</div>
        </SortableItem>
      ))}
      </SortableList>
    //   <div>TEST</div>
  )
}