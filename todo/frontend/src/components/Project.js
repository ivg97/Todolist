import React from 'react';
import {Link} from "react-router-dom";



const ProjectItem = ({project, deleteProject}) => {
    return(
        <tr>
            <td>
                <Link to={`project/${project.id}`}>{project.name}</Link>
            </td>
            <td>{project.user}</td>
            {/*<td>*/}
            {/*    {project.user.map((userID) => {return users.find((user) => user.id == userID).username})}*/}
            {/*</td>*/}
            <td>{project.link_to_repo}</td>
            <td>{project.date_of_creation}</td>
            <td><button onClick={() => deleteProject(project.id)} type='button'>Delete</button></td>
        </tr>
    )
}


const ProjectList = ({projects, deleteProject}) =>{

    return(
        <div>
        <table className={'table'}>
            <th>Наименование</th>
            <th>Пользователь</th>
            <th>Ссылка на репозитоий</th>
            <th>Дата создания</th>
            <th></th>
            {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/> )}
        </table>
        <Link to='/projects/create'>Create</Link>
        </div>
    )
}

export default ProjectList
