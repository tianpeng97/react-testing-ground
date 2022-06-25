const Note = ({ note, toggleImportant }) => {
  const label = note.important ? 'make unimportant' : 'make important'

  return (
    <li>
      {note.content} <button onClick={toggleImportant}>{label}</button>
    </li>
  )
}

export default Note
