import logo from './logo.svg';
import './App.css';
import React from "react";
import UserList from "./components/User";
import axios from "axios";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import ProjectList from './components/Project';
import NoteList from "./components/Note";
import {BrowserRouter, Link, Route, Redirect, Switch} from "react-router-dom";
import UserProjectList from "./components/UserProject";
import LoginForm from "./components/LoginForm";
import Cookies from "universal-cookie/lib";
import ProjectForm from "./components/ProjectForm";
import NoteForm from "./components/NoteForm";




class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'notes': [],
            'token': '',
        }
    }

    load_data(){
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/users/', {headers}).then(
            response => {
                const users = response.data
                this.setState({
                    'users': users,
                });
            }
        ).catch(error => {console.log(error)
        this.setState({users: []})})

        axios.get('http://127.0.0.1:8000/api/projects/', {headers}).then(
            response => {
                const projects = response.data.results
                this.setState({
                    'projects': projects
                });

            }
        ).catch(error => {console.log(error)
        this.setState({projects:[]})})

        axios.get('http://127.0.0.1:8000/api/notes/', {headers}).then(
            response => {
                const notes = response.data.results
                this.setState({
                    'notes': notes,
                });
                console.log(notes)
            }

        ).catch(error => {console.log(error)
        this.setState({notes:[]})})
    }

    set_token(token){
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.load_data())
    }


    is_auth(){
        return !!this.state.token
    }

    logout(){
        this.set_token('')
    }

    get_token_from_storage(){
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.load_data())
    }


    get_token(username, password){
        localStorage.setItem('login', username)
        let item = localStorage.getItem('login')
        // document.cookie= 'login=' + username + ';password=' +  password
        const data = {username: username, password:password}
        axios.post('http://127.0.0.1:8000/api-token-auth/', data).then(
            response => {
                this.set_token(response.data['token'])
            }
        ).catch(error => alert('неверный логин или пароль!'))

    }

    get_headers(){
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_auth()){
            headers['Authorization'] = 'Token' + this.state.token
        }
        return headers
    }

    deleteProject(id){
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers: headers}).then(
            response => {this.setState({projects: this.state.projects.filter((project)=>project.id !== id)})}
        ).catch(error => console.log(error))
    }

    createProject(name, user){
        const headers = this.get_headers()
        const data = {name: name, user: user}
        axios.post(`http://localhost:8000/api/projects`, data, {headers: headers}).then(
            response => {
                let new_project = response.data
                const  user = this.state.user.filter((item) => item.id === new_project.user)[0]
                new_project.user = user
                this.setState({projects: [...this.state.projects, new_project]})}
        ).catch(error => console.log(error))
    }

    deleteNote(id){
        const headers = this.get_headers()
        axios.delete(`https://localhost:8000/appi/notes/${id}`, {headers: headers})
            .then(response => {
                this.setState({notes: this.state.notes.filter((note) => note.id !== id)})
            }).catch(error => console.log(error))
    }

    createNote(name, project, user){
        const headers = this.get_headers()
        const data = {name: name, project: project, user: user}
        axios.post(`https://localhost:8000/api/notes/`, data, {headers: headers})
            .then(response => {
                let new_note = response.data
                const project = this.state.project.filter((note) => note.id === new_note.project)[0]
                const user = this.state.user.filter((user) => user.id === new_note.user)[0]
                new_note.project = project
                new_note.user = user
                this.setState({notes: [...this.state.notes, new_note]})
            }).catch(error => console.log(error))
    }

    componentDidMount() {
        this.get_token_from_storage()
        // this.load_data()

        // const users = [
        //     {
        //         'username': 'i',
        //         'first_name': 'ivg',
        //         'last_name': 'gavr',
        //         'email': '@'
        //     }
        // ]
        // this.setState({
        //     'users': users
        // })
    }

    render() {
        return (
            <div className="App">

                <BrowserRouter>
                    <Route>{this.is_auth() ? <button onClick={()=> this.logout()}> Выйти </button> : <Link to='/login'>Войти</Link>}</Route>
                    <Menu/>
                    <Route exact path='/login' component={() => <LoginForm get_token={(username, password) => this.get_token(username, password)}/>}/>
                    <Route exact path='/' component={() => <UserList users={this.state.users}/>}/>
                    {/*<Route exact path='/projects' component={() => <ProjectList projects={this.state.projects}/>}/>*/}
                    <Route exact path='/projects/create' component={() => <ProjectForm users={this.state.users} createProject={(name, user) => this.createProject(name, user)}/>}/>
                    <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects} deleteProject={(id)=>this.deleteProject(id)}/>}/>
                    <Route exact path='/notes/create' component={()=> <NoteForm createNote={(name, project, user) => this.createNote(name, project, user)}/>}/>
                    <Route exact path='/notes' component={() => <NoteList notes={this.state.notes} deleteNote={(id) => this.deleteNote(id)}/>}/>

                    <Route exact path='/user/:id'>
                        <UserProjectList projects={this.state.projects} users={this.state.users}/>

                    </Route>


                    {/*<Redirect from='/user' to='/projects'/>*/}
                </BrowserRouter>
                <Footer/>
            </div>

        );
    }
}

export default App;
