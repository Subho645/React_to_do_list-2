import { useState, useRef, useEffect } from 'react';
import './CSS/Todo.css';
import Todoitems from './Todoitems';

let count = 0;
const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [editing, setEditing] = useState({ no: null, text: '' });
  const inputRef = useRef(null);

  const addOrUpdate = () => {
    if (editing.no !== null) {
      const updatedTodos = todos.map(todo => todo.no === editing.no ? { ...todo, text: inputRef.current.value } : todo);
      setTodos(updatedTodos);
      setEditing({ no: null, text: '' });
    } else {
      setTodos([...todos, { no: count++, text: inputRef.current.value, display: '' }]);
    }
    inputRef.current.value = '';
    localStorage.setItem('todos_count', count);
  };

  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem('todos')) || []);
    count = Number(localStorage.getItem('todos_count')) || 0;
  }, []);

  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem('todos', JSON.stringify(todos));
    }, 100);
  }, [todos]);

  const editTodo = (no, text) => {
    inputRef.current.value = text;
    setEditing({ no, text });
  };

  return (
    <div className='todo'>
      <div className='todo-header'>To-Do List</div>
      <div className='todo-add'>
        <input ref={inputRef} type='text' placeholder='Add your Task' className='todo-input' />
        <div onClick={addOrUpdate} className='todo-add-btn'>
          {editing.no !== null ? 'Update' : 'ADD'}
        </div>
      </div>
      <div className='todo-list'>
        {todos.map((item, index) => (
          <Todoitems key={index} no={item.no} setTodos={setTodos} display={item.display} text={item.text} editTodo={editTodo} />
        ))}
      </div>
    </div>
  );
};

export default Todo;
