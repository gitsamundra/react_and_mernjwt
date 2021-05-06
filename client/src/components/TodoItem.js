import React from 'react'

const TodoItem = (props) => {
  return (
    <li className='list-group-item mt-5'>
      {props.todo.name}
    </li>
  )
}

export default TodoItem
