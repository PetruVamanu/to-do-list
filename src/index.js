import React from 'react';
import ReactDOM from 'react-dom/client';
import './output.css';
import {ToDoList} from './ToDoList.js'

class Page extends React.PureComponent {
    render() {
        return (
            <div className='w-full h-full font-adelia p-5'>
                <div className='flex flex-col items-center'>
                    <h1 className='text-4xl font-semibold'>My To-DO</h1>
                    <ToDoList />
                </div>
            </div>
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Page />);
