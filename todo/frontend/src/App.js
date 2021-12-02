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




class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'notes': [],
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/').then(
            response => {
                const users = response.data
                this.setState({
                    'users': users,
                });
            }
        ).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects/').then(
            response => {
                const projects = response.data.results
                this.setState({
                'projects': projects
                });

            }
        ).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/notes/').then(
            response => {
                const notes = response.data.results
                this.setState({
                    'notes': notes,
                });
                console.log(notes)
            }

        ).catch(error => console.log(error))
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
                    <Menu/>
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
