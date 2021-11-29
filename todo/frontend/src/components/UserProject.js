import React from 'react';
import {useParams} from "react-router-dom";


const ProjectItem = ({project, users}) => {

    return(
        <tr>
            <td>{project.name}</td>
            <td>
                {project.user.map((userID) => {return users.find((user) => user.id == userID).username})}
            </td>
            <td>{project.link_to_repo}</td>
            <td>{project.date_of_creation}</td>
        </tr>
    )

}


const UserProjectList = ({projects, users}) =>{
    let {id} = useParams();
    let filter_items = projects.filter((project => project.user.includes(parseInt(id))))

    return(
        <table>
            <th>Наименование</th>
            <th>Пользователь</th>
            <th>Ссылка на репозитоий</th>
            <th>Дата создания</th>
            {filter_items.map((project) => <ProjectItem project={project} users={users}/> )}
        </table>
    )
}

export default UserProjectList