import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";

export default function KanBan() {
  const [completed, setCompleted] = useState([]);
  const [incomplete, setIncomplete] = useState([]);

  useEffect(()=>
  {
    console.log(completed)
  }, [completed])

  useEffect(() => {
     fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        const json = response.json();
        return json;  
      })
      .then((json) => {

        setCompleted(json.filter((task) => task.completed));
        setIncomplete(json.filter((task) => !task.completed));
      });
  }, []);

  const handleDragEnd = (result) => {
    console.log(result)
    const { destination, source, draggableId } = result;

    console.log("destination",destination)
    console.log("source",source)

    console.log(!destination)

    if (!destination || source === destination) return;

   
    // GET ITEM

    const data = [...completed, ...incomplete]
    console.log(data)

    console.log(draggableId)
    const obj = data.filter((data) => draggableId == data.id)
    const task = obj[0]



    //ADD ITEM
    
  };

  function findItemById(id, array) {
    return array.find((item) => item.id === id);
  }

  function removeItemById(id, array) {
    return array.filter((item) => item.id !== id);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <h2 style={{ textAlign: "center" }}>PROGRESS BOARD</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Column title={"TO DO"} tasks={incomplete} id={"1"} />
        <Column title={"DONE"} tasks={completed} id={"2"} />
        <Column title={"BACKLOG"} tasks={[]} id={"3"} />
      </div>
    </DragDropContext>
  );
}