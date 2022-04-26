import { useState, useEffect} from "react"
import { render } from "react-dom";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {

const title = "Task Traker"
const [showAddTask, setShowAddTAsk] = useState(false)
const [tasks, setTasks] = useState([])


useEffect (() => {
  const getTasks = async()=>{
    const taskFromServer = await fetchTasks()
    setTasks(taskFromServer)
    
  }
  getTasks()
},[])


//Fetch task
const fetchTasks= async() =>{
  const res = await fetch('http://localhost:5000/tasks')
  const data= await res.json()
  return data
}
//Add task 
const addTask= async(task)=>{
  const res = await fetch(`http://localhost:5000/tasks`,
  {
    method: 'POST',
    headers:{'Content-Type': 'application/json'},
    body:JSON.stringify(task)
  })

  const data = await res.json()
  
  // const id = Math.floor(Math.random()* 1000) + 1
  // const newTask={id, ...task}
  setTasks([ ...tasks, data])
 
}

//show add task form
const taskForm = ()=>{
  setShowAddTAsk(!showAddTask)
  
  
  
}
//delete task
const deleteTask = async (id)=>{
  await fetch(`http://localhost:5000/tasks/${id}`, {
      method :'DELETE',
    })
    setTasks(tasks.filter((task)=>task.id !== id))
    
  }
  
  
  //Fetch task
  const fetchTask= async(id) =>{
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data= await res.json()
    return data
  }

//Toggle reminder
const toggleReminder = async (id)=>{
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder}
    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method:'PUT',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()

      setTasks(
        tasks.map((task)=>
         task.id === id ? { ...task, reminder: data.reminder} : task
         )
         )
         
         console.log(data)
}
  
  return (
      <Router>
    <div className="container">
      <Header title = {title}  showAddTask ={taskForm}  showAdd ={showAddTask}/>
      
      
         
          <Routes>

          <Route path='/' exact element={
            <>

              { showAddTask && <AddTask onAdd={addTask} /> }

              { tasks.length > 0 ? 
                <Tasks tasks={tasks} onDelete={deleteTask}  onToggle={toggleReminder} /> : 'No Tasks'}
  

            </>
          } />
          <Route path='/about'  element={<About />}>
          
          </Route>
         
          </Routes>

        <Footer />

    </div>
        </Router>
    
  );
}

export default App;
