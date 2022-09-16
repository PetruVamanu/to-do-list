import React from 'react';
import './output.css';

export class TodoForm extends React.Component{
    render() {
        const {handleSubmit, value, handleChange, isLoading} = this.props;
        return(
            <form className='flex' onSubmit={handleSubmit}>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                Todo:
                </label>
                    <input className='block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500'
                     type="text" placeholder='type to-do...' value={value} onChange={handleChange} />
                {!isLoading && ( 
                    <input className="ml-2 max-w-4xl flex bg-blue-500 hover:bg-green-700 text-white py-1 px-2 rounded-2xl"  type="submit" value="Submit" />
                )}
                {isLoading &&(
                    <div>
                        Loading...
                    </div>
                )}
            </form>
        );
    }

}