import { ITodo } from "../utils/model"
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { MdOutlineDownloadDone } from "react-icons/md";
import {useState,useRef,useEffect} from "react"
import { Draggable } from "react-beautiful-dnd";
interface IProps{
    todo:ITodo,
    handleDone:(id:number)=>void,
    handleDelete:(id:number)=>void,
    handleEditedTodo:(id:number,editedTodo:string)=>void,
    index:number
}
export default function SingleTodo({index,todo,handleDone,handleDelete,handleEditedTodo}:IProps) {
    const [edit,setEdit]=useState<boolean>(false);
    const [editedTodo, setEditedTodo] = useState<string>(todo.todo);
    const inputRef = useRef<HTMLInputElement>(null)
    const handleEdit=()=>{
        if(!todo.isdone){
            setEdit(!edit);
        }
    }
  const handleSubmitTodo=(e:React.FormEvent,id:number,editedTodo:string)=>{
    e.preventDefault();
    handleEditedTodo(id,editedTodo);
    setEdit(!edit)
  }
  useEffect(() => {
inputRef.current?.focus()
  
  }, [edit])
  
  return (
<Draggable draggableId={todo.id.toString()} index={index}>
{(provided,snapshot)=>(
  <li 
    className={`todo_item ${snapshot.isDragging?"todo_isdraging":""}`}
   {...provided.draggableProps}
   {...provided.dragHandleProps}
   ref={provided.innerRef}>
  <form className="single_todo" onSubmit={(e)=>handleSubmitTodo(e,todo.id,editedTodo)}>
  {edit?<input ref={inputRef} value={editedTodo} onChange={(e)=>setEditedTodo(e.target.value)}/>:
  <>{todo.isdone?<s className="donetodo_text">{todo.todo}</s>:<span
   className="todo_text">{todo.todo}</span>}</>
  }      
       <div className="icon_wrapper">
        <span className="action_icon" onClick={()=>handleDelete(todo.id)}><AiFillDelete/></span>
          <span className="action_icon" onClick={handleEdit}><AiFillEdit/></span>
          <span className="action_icon" onClick={()=>handleDone(todo.id)} ><MdOutlineDownloadDone/></span>
       </div>
      </form>
  </li>
)}
</Draggable>
  )
}
