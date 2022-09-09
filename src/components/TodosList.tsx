import { Droppable } from "react-beautiful-dnd"
import { ITodo } from "../utils/model"
import SingleTodo from "./SingleTodo"
interface IProps{
    todos:ITodo[],
    setTodos:React.Dispatch<React.SetStateAction<ITodo[]>>,
    setCompletedTodos:React.Dispatch<React.SetStateAction<ITodo[]>>,
    completedTodos:ITodo[]
}
const TodosList = ({todos,setTodos,completedTodos,setCompletedTodos}:IProps) => {

    const handleDone=(id:number)=>{
    setTodos(todos.map((todo)=>todo.id===id?{...todo,isdone:!todo.isdone}:todo));
    setCompletedTodos(completedTodos.map((todo)=>todo.id===id?{...todo,isdone:!todo.isdone}:todo))
    }
    const handleDelete=(id:number)=>{
       setTodos(todos.filter((todo)=>todo.id!==id));
       setCompletedTodos(completedTodos.filter((todo)=>todo.id!==id));
    }
    const handleEditedTodo=(id:number,editedTodo:string)=>{
        setTodos(todos.map((todo)=>todo.id===id?{...todo,todo:editedTodo}:todo));
        setCompletedTodos(completedTodos.map((todo)=>todo.id===id?{...todo,todo:editedTodo}:todo))
    }
  return (
  <div className="todos_container">
    <Droppable  droppableId="activeTodos">
      {(provided,snapshot)=>( 
      <ul  className={`active_list ${snapshot.isDraggingOver?"activeList_isdragOver":""}`}
      ref={provided.innerRef} 
      {...provided.droppableProps}>
        <h3 className="list_title">انجام نشده</h3>
        {todos.map((todo,index)=><SingleTodo
        index={index}
         key={todo.id} todo={todo}
         handleDelete={handleDelete}
         handleEditedTodo={handleEditedTodo}
         handleDone={handleDone}/>)}
          {provided.placeholder}
    </ul>)}
    </Droppable>
    <Droppable  droppableId="completedtodos"> 
      {(provided,snapshot)=>( <ul 
       className={`completed_list ${snapshot.isDraggingOver?"completedList_isdragOver":''}`} 
      ref={provided.innerRef} {...provided.droppableProps}>
        <h3 className="list_title">انجام شده</h3>
        {completedTodos.map((todo,index)=><SingleTodo
         index={index}
         key={todo.id}
          todo={todo}
         handleDelete={handleDelete}
         handleEditedTodo={handleEditedTodo}
         handleDone={handleDone}/>)}
          {provided.placeholder}
    </ul>)}
   
    </Droppable>
    
  </div>
  )
}

export default TodosList