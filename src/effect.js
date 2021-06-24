import React, { useEffect, useState } from 'react';
let count = 0;
export default function UseEffect() {
    let [task, setCTask] = useState("");
    let [taskList, setTaskList] = useState([]);
    const addTask = () => {
        let newTaskList = [...taskList];
        newTaskList.push({
            task: task,
            id: Date.now()
        })
        setTaskList(newTaskList);
        setCTask("");
    }
    function cleanUp() {
        console.log("Cleanup function is executed");
    }
    useEffect(function () {
        console.log("i will run only after the first render");
        return cleanUp;
    }, []);

    // useEffect(function () {
    //     console.log("I will run after every render ")
    //     return cleanUp;
    // });

    useEffect(function () {
        console.log(`I will run whenever my dependent's state is changed or
         initally rendred`);
        count++;
        console.log(count);
        return cleanUp;
    }, [taskList]);

    const handleDelete = (id) => {
        // let newTaskList = [...taskList];
        let newTaskList = taskList.filter((taskObj) => {
            return taskObj.id !== id;
        })
        setTaskList(newTaskList);
    }
    return (
        <div>
            Todo Example
            <input type="text" value={task}
                onChange={(e) => { setCTask(e.target.value) }} />
            <button onClick={addTask}>AddTask</button>
            <ul>
                {
                    taskList.map((taskObj) => {
                        return (
                            <ListItem key={taskObj.id} taskObj={taskObj} handleDelete={handleDelete} taskList ={taskList}></ListItem>
                        )
                    })
                }
            </ul>
            

        </div>
    )
}
function ListItem(props) {
    let {taskObj, handleDelete } = props;

    useEffect(()=> {
        console.log("useffect ran", taskObj.task);

        return () => {
            console.log("cleanup for", taskObj.task, "ran")
        }
    },[taskObj]);

    return (
        <li key={taskObj.id} onClick={() => {
            handleDelete(taskObj.id)
        }}>{taskObj.task}</li>
    )
}