import React, { Component } from 'react';
import axios from 'axios';
import ChoreListItem from './ChoreListItem';

class EditDay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chore: '',
        }
    }

    handleSubmit = async e => {
        e.preventDefault()
        const id = this.props.list._id
        try {
            await axios.post(`/lists/${id}`, {
                chore: this.state.chore,
                day: this.props.day
            })
        } catch(e) {
            console.log(e)
        }
        this.clearInput()
        this.props.getLists()
    }

    clearInput = () => {
        this.setState({ chore: '' })
    }

    removeChore = async choreId => {
        try {
            await axios.delete(`/lists/${this.props.list._id}/chores/${choreId}`)
        } catch(e) {
            console.log(e)
        }
        this.props.getLists()
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div className="card single-day">
                <div className="card-header">{this.props.day}</div>
                <div className="card-body">
                    <form action="" onSubmit={this.handleSubmit}>
                        <input type="text" className="form-control" name="chore" placeholder="Add chore" onChange={this.handleChange} value={this.state.chore} />
                    </form>
                    <h6 className="card-title" >Chores for day</h6>
                    <ul className="list-group">
                        {this.props.list.chores.filter((chore) => {
                            return chore.day === this.props.day 
                        }).map((chore) => {
                            return <ChoreListItem
                                key={chore._id}
                                chore={chore.chore}
                                removeChore={this.removeChore}
                                id={chore._id} />
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}

export default EditDay;