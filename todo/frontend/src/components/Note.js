import React from 'react';


const NoteItem = ({note}) => {
    return(
        <tr>
            <td>{note.text}</td>
            <td>{note.project}</td>
            <td>{note.user}</td>
            <td>{note.date_of_creation.getTi}</td>
            <td>{note.update_date}</td>
        </tr>

    )
}


const NoteList = ({notes}) =>{
    return(
        <table className={'table'}>
            <th>Содержимое</th>
            <th>Проект</th>
            <th>Пользователь</th>
            <th>Дата создания</th>
            <th>Дата обновления</th>
            {notes.map((note) => <NoteItem note={note} /> )}
        </table>
    )
}
export default NoteList
