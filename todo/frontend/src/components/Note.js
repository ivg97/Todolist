import React from 'react';
import {Link} from "react-router-dom";


const NoteItem = ({note, deleteNote}) => {
    return(
        <tr>
            <td>{note.text}</td>
            <td>{note.project}</td>
            <td>{note.user}</td>
            <td>{note.date_of_creation.getTi}</td>
            <td>{note.update_date}</td>
            <td><button onClick={()=> deleteNote(note.id)} type="button">Delete</button></td>
        </tr>

    )
}


const NoteList = ({notes, deleteNote}) =>{
    return(
        <div>
        <table className={'table'}>
            <th>Содержимое</th>
            <th>Проект</th>
            <th>Пользователь</th>
            <th>Дата создания</th>
            <th>Дата обновления</th>
            {notes.map((note) => <NoteItem note={note} deleteNote={deleteNote}/> )}
        </table>
    <Link to='/notes/create'>Create</Link>
        </div>
    )
}
export default NoteList
