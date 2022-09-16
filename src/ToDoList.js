import React from 'react';
import './output.css';
import axios from 'axios';
import {ToDoListElement} from './ToDoListElement.js'
import {TodoForm} from './ToDoForm.js'

export class ToDoList extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            ToDos: [],
            input : '',
            isLoading : false,
        };
    }

    async componentDidMount(){
        const response = await axios({
            url: 'http://127.0.0.1:5000/todos',
            method: "GET",
        });
        this.setState({ToDos: response.data['todos']});
    }

    handleDeleteToDo = async (i) => {
        const NewToDos = this.state.ToDos.slice();
        const index = NewToDos.findIndex(item => item.id === i);
        
        const response = await axios({
            url: 'http://127.0.0.1:5000/todos/' + NewToDos[index]['id'],
            method: "DELETE",
        });
        NewToDos.splice(index, 1);
        this.setState({ ToDos: NewToDos });

    }

    handleDoneTodo = async (i) => {
        const list = this.state.ToDos.slice();
        const index = list.findIndex(item => item.id === i);
        list[index].isdone = true;
        const {task, isdone, id} = list[index];
        this.setState({ToDos: list});
        
        const res = axios.put('http://127.0.0.1:5000/todos/' + i, {
                    task: task,
                    isdone: isdone,
                });
    }


    handleChange = (event) => {
        this.setState({ input: event.target.value });        
    }
    toggleLoading = () =>{
        let isLoading = this.state.isLoading;
        isLoading = !isLoading;
        this.setState({isLoading});
    }
    handleSubmit = async (event) => {
        event.preventDefault();
 
        const {ToDos, input} = this.state;
        this.setState({ }, this.toggleLoading);  
        const id_json = await axios({
            url: 'http://127.0.0.1:5000/todos',
            method: "POST",
            data:{
                task: input,
                isdone: false,
            }
        });
        const id = id_json.data['id'];
        const newData = [...ToDos, {task : input, isdone : false, id}];
        this.setState({ ToDos: newData,  input: '' }, this.toggleLoading);   
    }

    render() {
        const{input, isLoading} = this.state;
        return (
            <div className="flex max-w-4xl w-full flex-col justify-center">            
                <TodoForm value={input} isLoading = { isLoading } handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
                <ul className=''>
                    {this.state.ToDos.map((toDo) => {
                        const {task, isdone, id} = toDo;
                        return(
                            <ToDoListElement
                                    key = {id}
                                    task = {task}
                                    isdone = {isdone}
                                    onDoneClick = {() => this.handleDoneTodo(id)}
                                    deleteTodo = {() => this.handleDeleteToDo(id)}
                                    />
                        )
                    }
                    
                    )}
                </ul>
            </div>
        )
    }
}