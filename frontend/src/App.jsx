import { useState, useEffect } from "react"
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

function App() {


  const [tasks, setTasks] = useState([])
  const [input, setInput] = useState("")

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks")
    const data = await res.json()
    setTasks(data)
  }

  const addTask = async () => {
    await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title: input })
    })

    setInput("")
    fetchTasks()
  } 

  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <div>
      <h1>Smart Todo</h1>

      <input 
        value = {input}
        onChange = {(e) => setInput(e.target.value)}
      />

      <button onClick = {addTask}>Add</button>
      <button onClick = {fetchTasks}>see</button>

      <ul>
        {tasks.map(task => (
          <li key = {task.id} >{task.title}</li>
        ))}
      </ul>

    </div>
  )
}

export default App
