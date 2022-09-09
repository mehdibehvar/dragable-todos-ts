import "./App.css";
import InputField from "./components/InputField";
import { useState } from "react";
import { ITodo } from "./utils/model";
import TodosList from "./components/TodosList";
import ReactPlayer from "react-player";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
function App() {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<ITodo[]>([]);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isdone: false }]);
      setTodo("");
    }
  };
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if(!destination) return;
    if(source.droppableId===destination.droppableId && source.index===destination.index) return;
    let add,
    active=todos,
    completed=completedTodos;
    if(source.droppableId==="activeTodos"){
      add=active[source.index];
      active.splice(source.index,1);
    }else{
      add=completed[source.index];
      completed.splice(source.index,1)
    }
    if(destination.droppableId==="activeTodos"){
      active.splice(destination.index,0,add)
    }else{
      completed.splice(destination.index,0,add)
    }
    setCompletedTodos(completed);
    setTodos(active);
  };
  return (
    <>
      <DragDropContext
       onDragEnd={onDragEnd}
       >
        <div className="todo_app">
          <div className="header">
            <h3>لیست وظایف</h3>
          </div>
          <div className="main_container">
            <InputField
              todo={todo}
              setTodo={setTodo}
              handleAddTodo={handleAddTodo}
            />
            <TodosList
              todos={todos}
              setTodos={setTodos}
              completedTodos={completedTodos}
              setCompletedTodos={setCompletedTodos}
            />
          </div>
        </div>
        <div className='video_section'>
<ReactPlayer

controls={true}
url={['/assets/videos/v1.mkv' ]}

  />
</div>
<div className='image_zoom'>
<Zoom>
    <img
      alt="That Wanaka Tree, New Zealand by Laura Smetsers"
      src="/assets/images/imgmodel.png"
      width="500"
    />
  </Zoom>
</div>
      </DragDropContext>
    </>
  );
}

export default App;
