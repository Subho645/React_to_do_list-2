import './CSS/TodoItems.css'
import tick from "./Assets/tick.png";
import not_tick from "./Assets/not_tick.png";
import cross from "./Assets/cross.png";
import editIcon from "./Assets/edit.png"; // Add the edit icon

const Todoitems = ({ no, display, text, setTodos, editTodo }) => {
    const deleteTodo = (no) => {
        let data = JSON.parse(localStorage.getItem("todos"));
        data = data.filter((todo) => todo.no !== no);
        setTodos(data);
    };

    const toggle = (no) => {
        let data = JSON.parse(localStorage.getItem("todos"));
        for (let i = 0; i < data.length; i++) {
            if (data[i].no === no) {
                data[i].display = data[i].display === "" ? "line-through" : "";
                break;
            }
        }
        setTodos(data);
    };

    return (
        <div className='todoitems'>
            <div className={`todoitems-container ${display}`} onClick={() => { toggle(no) }}>
                {display === "" ? <img src={not_tick} alt='' className='todoitems-icon' /> : <img src={tick} alt='' className='todoitems-icon' />}
                <div className="todoitems-text">{text}</div>
            </div>
            <div className='todoitems-actions'>
                <img className='todoitems-edit-icon' onClick={() => { editTodo(no, text) }} src={editIcon} alt='' />
                <img className='todoitems-cross-icon' onClick={() => { deleteTodo(no) }} src={cross} alt='' />
            </div>
        </div>
    );
};

export default Todoitems;
