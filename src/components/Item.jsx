import React from "react"

import {
  IconButton,
  Checkbox,
  ListItem,
  Typography,
  TextField,
  Button,
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"

export const Item = ({ item, changeStatus, removeTask, editTask }) => {
  const [newEditText, setNewEditText] = React.useState("")
  const [edit, setEdit] = React.useState(false)
  const [objId, setObjId] = React.useState("")

  const onChangeInput = (e) => {
    setNewEditText(e.target.value)
  }

  const onAddTask = (id) => {
    if (newEditText.trim() !== "") {
      editTask(id, newEditText)
      setNewEditText("")
      setEdit(false)
    }
  }

  const onClickKeyPress = (e) => {
    if (e.key === "Enter") {
      onAddTask(objId)
    }
  }

  const onCklickFocus = () => {
    setEdit(false)
    onAddTask(objId)
  }

  const onCklickEdit = (id) => {
    setObjId(id)
    setEdit(true)
  }

  return (
    <>
      {item.map((obj) => (
        <ListItem key={obj.id}>
          <div className="d-flex item">
            <Checkbox
              checked={obj.isDone}
              onChange={(e) => changeStatus(obj.id, e.currentTarget.checked)}
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckCircleIcon />}
            />
            {edit && objId === obj.id ? (
              <>
                <TextField
                  onBlur={onCklickFocus}
                  autoFocus={true}
                  value={newEditText}
                  onChange={onChangeInput}
                  onKeyPress={onClickKeyPress}
                  placeholder={obj.text}
                  variant="standard"
                  fullWidth
                />
                <div className="item-buttons d-flex">
                  <Button onClick={() => onAddTask(obj.id)}>
                    <AddIcon />
                  </Button>
                </div>
              </>
            ) : (
              <Typography className="item-text">{obj.text}</Typography>
            )}
            {!edit && (
              <div className="item-buttons d-flex">
                <IconButton onClick={() => onCklickEdit(obj.id)}>
                  <EditIcon style={{ fontSize: 20 }} />
                </IconButton>
                <IconButton onClick={() => removeTask(obj.id)}>
                  <DeleteOutlineIcon style={{ fontSize: 20 }} />
                </IconButton>
              </div>
            )}
          </div>
        </ListItem>
      ))}
    </>
  )
}
