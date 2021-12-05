import logo from './logo.svg';
import './App.css';
import React from "react";
import UserList from "./components/User";
import axios from "axios";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import ProjectList from './components/Project';
import NoteList from "./components/Note";
import {BrowserRouter, Link, Route, Redirect} from "react-router-dom";
import UserProjectList from "./components/UserProject";
import LoginForm from "./components/LoginForm";
import Cookies from "universal-cookie/lib";




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
            <div>

                <BrowserRouter>
                    <Route>{this.is_auth() ? <button onClick={()=> this.logout()}> Выйти </button> : <Link to='/login'>Войти</Link>}</Route>
                    <Menu/>
                    <Route exact path='/login' component={() => <LoginForm get_token={(username, password) => this.get_token(username, password)}/>}/>
                    <Route exact path='/' component={() => <UserList users={this.state.users}/>}/>
                    <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects}/>}/>
                    <Route exact path='/notes' component={() => <NoteList notes={this.state.notes}/>}/>
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
