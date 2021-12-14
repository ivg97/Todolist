import React from 'react';
import {Link} from "react-router-dom";


const ProjectItem = ({project, users}) => {
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
        </tr>
    )
}


const ProjectList = ({projects}) =>{

    return(
        <table className={'table'}>
            <th>Наименование</th>
            <th>Пользователь</th>
            <th>Ссылка на репозитоий</th>
            <th>Дата создания</th>
            {projects.map((project) => <ProjectItem project={project}/> )}
        </table>
    )
}

export default ProjectList
