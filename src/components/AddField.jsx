import React from "react"

import { TextField, Button } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"

export const AddField = ({ addTask }) => {
  const [text, setText] = React.useState("")

  const onChangeInput = (e) => {
    setText(e.target.value)
  }

  const onAddTask = () => {
    if (text.trim() !== "") {
      addTask(text.trim())
      setText("")
    }
  }

  const onClickKeyPress = (e) => {
    if (e.key === "Enter") {
      onAddTask()
    }
  }

  return (
    <div className="field">
      <TextField
        value={text}
        onChange={onChangeInput}
        onKeyPress={onClickKeyPress}
        placeholder="Введіть текст завдання..."
        variant="standard"
        fullWidth
      />
      <Button onClick={onAddTask}>
        <AddIcon />
      </Button>
    </div>
  )
}
