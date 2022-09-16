import React from 'react';
import './output.css';
 
export class ToDoListElement extends React.PureComponent {
    render() {
        const {task, isdone, deleteTodo, onDoneClick } = this.props;
        return (

            <li className=' border-gray-300  my-4 p-4 bg-gray-100 rounded-lg overflow-hidden shadow-lg place-items-center flex flex-col w-full'>
                <div className={('text-2xl ' + (isdone ? 'line-through' : ''))}>{task}</div>
                <div className='flex w-full'>
                    <button
                        className="flex  bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-2xl"
                        onClick={deleteTodo}
                        >
                        Delete
                    </button>
                    {!isdone && (
                        <button
                        
                            className="flex  ml-auto bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-2xl"
                            onClick={onDoneClick}
                        >
                            Done
                        </button>
                    )}
                </div>
            </li>
        )
    }
}

