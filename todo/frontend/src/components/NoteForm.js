import React from 'react'



class NoteForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {name: '', project: 0, user: 0}
    }
        handleChange(event){
            this.setState(
                {
                    [event.target.name]: event.target.value
                }
            );
        }
        handleSubmit(event){
        this.props.createNote(this.state.name, this.state.project, this.state.user)
            console.log(this.state.name)
            console.log(this.state.project)
            console.log(this.state.user)
            event.preventDefault()
        }
        render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="login">name</label>
                    <input type="text" className="form-control" name='name' value={this.state.name} onChange={(event) => this.handleChange(event)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="project">project</label>
                    <input type="number" className="form-control" name='project' value={this.state.project} onChange={(event)=> this.handleChange(event)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="user">user</label>
                    <input type="number" className="form-control" name='user' value={this.state.user} onChange={(event)=> this.handleChange(event)}/>
                </div>
                <input type="submit" className="btn btn-primary" value="Save"/>

            </form>
        )
        }
}

export default NoteForm