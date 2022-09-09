import { ITodo } from "../utils/model"

interface IProps{
    todo:string,
    setTodo:React.Dispatch<React.SetStateAction<string>>,
    handleAddTodo:(e:React.FormEvent)=>void
}
const InputField=({todo,setTodo,handleAddTodo}:IProps) => {
  
  return (
    <form className="input_form" onSubmit={(e)=>handleAddTodo(e)}>
        <input className="todo_input" placeholder="چیزی تایپ کن..." value={todo} onChange={(e)=>setTodo(e.target.value)}></input>
        <button className="add_button" type="submit">add</button>
    </form>
  )
}

export default InputField