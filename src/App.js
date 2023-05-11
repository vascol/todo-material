import React from "react"
import { v1 } from "uuid"

import { AddField } from "./components/AddField"
import { Item } from "./components/Item"

import { Paper, Divider, Button, List, Tabs, Tab } from "@mui/material"

function App() {
  const [tasks, setTasks] = React.useState([
    { id: v1(), text: "Завдання №1", isDone: true },
    { id: v1(), text: "Завдання №2", isDone: false },
    { id: v1(), text: "Завдання №3", isDone: false },
    { id: v1(), text: "Завдання №4", isDone: false },
  ])

  const [tabsValue, setTabsValue] = React.useState("all")

  // change tab
  const handleChange = (event, newValue) => {
    setTabsValue(newValue)
  }

  // add new task
  const addTask = (text) => {
    const newTask = {
      id: v1(),
      text: text,
      isDone: false,
    }
    const newTasks = [newTask, ...tasks]
    setTasks(newTasks)
  }

  // change task status
  const changeStatus = (taskId, isDone) => {
    const task = tasks.find((t) => t.id === taskId)
    if (task) {
      task.isDone = isDone
    }
    setTasks([...tasks])
  }

  // remove task
  const removeTask = (taskId) => {
    const filterTasks = tasks.filter((obj) => obj.id !== taskId)
    setTasks(filterTasks)
  }

  // edit task
  const editTask = (taskId, newText) => {
    const findTask = tasks.find((obj) => obj.id === taskId)

    if (findTask) {
      findTask.text = newText
    }
  }

  // clean task
  const cleanTask = () => {
    if (window.confirm("Дісйно видалити всі?")) {
      setTasks([])
    }
  }

  // filter tasks
  let taskForTodoList = tasks
  if (tabsValue === "active") {
    taskForTodoList = tasks.filter((obj) => obj.isDone === false)
  }
  if (tabsValue === "completed") {
    taskForTodoList = tasks.filter((obj) => obj.isDone === true)
  }

  return (
    <div className="App">
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список завдань</h4>
        </Paper>
        <AddField addTask={addTask} editTask={editTask} />
        <Divider />
        <Tabs value={tabsValue} onChange={handleChange}>
          <Tab value={"all"} label="Всі" />
          <Tab value={"active"} label="Активні" />
          <Tab value={"completed"} label="Завершені" />
        </Tabs>
        <Divider />
        <List>
          <Item
            item={taskForTodoList}
            changeStatus={changeStatus}
            removeTask={removeTask}
            editTask={editTask}
            addTask={addTask}
          />
        </List>
        <Divider />
        <div className="check-buttons">
          <Button onClick={cleanTask}>Очистити</Button>
        </div>
      </Paper>
    </div>
  )
}

export default App
