import logo from './logo.svg';
import './App.css';
import React from "react";
import UserList from "./components/User";
import axios from "axios";
import {Footer} from "./components/Footer";
import Menu from "./components/Menu";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/').then(
            response => {
                const users = response.data
                this.setState({
                    'users': users
                })
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
                <Menu/>
                <UserList users={this.state.users}/>
                <Footer/>
            </div>

        );

    }

}

export default App;
