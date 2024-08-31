import React, { useEffect, useState } from 'react'
import "./style.css"

// https://todolist-react-jirf.onrender.com/



// get the local storage data back
const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist")

    if (lists) {
        return JSON.parse(lists)
    }
    else {
        return []
    }
}

const Todo = () => {
    const [inputData, setInputData] = useState("")
    const [items, setItems] = useState(getLocalData())
    const [isEditItem, setIsEditItem] = useState("")
    const [toggleButton, setToggleButton] = useState(false)

    // add the items function
    const addItem = () => {
        if (!inputData) {
            alert("Plz fill the data to add")
        }
        else if (inputData && toggleButton) {
            setItems(
                items.map((currElem) => {
                    if (currElem.id === isEditItem) {
                        return { ...currElem, name: inputData }
                    }
                    return currElem
                })
            )
            setInputData([])
            setIsEditItem(null)
            setToggleButton(false)
        }
        else {
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputData,
            }
            setItems([...items, myNewInputData])
            setInputData("")
        }
    }

    //edit the items

    const editItem = (index) => {
        const item_todo_edited = items.find((currElem) => {
            return currElem.id === index
        })

        setInputData(item_todo_edited.name)
        setIsEditItem(index)
        setToggleButton(true)
    }


    //delete items
    const deleteItem = (index) => {
        const updatedItems = items.filter((currElem) => {
            return currElem.id !== index
        })
        setItems(updatedItems)
    }

    //remove all
    const removeAll = () => {
        setItems([])
    }

    //adding a local storage
    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(items))
    }, [items])

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./images/todo.svg" alt="todologo" />
                        <figcaption>Add Your List Here✌️</figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text" placeholder="✍️ Add Item" className="form-control"
                            value={inputData}
                            onChange={(e) => setInputData(e.target.value)}
                        />
                        {toggleButton ? (<i className="far fa-edit add-btn" onClick={addItem}></i>
                        ) : (
                            <i className="fa fa-plus add-btn" onClick={addItem}></i>)}

                    </div>
                    {/* show our items */}
                    <div className="showItems">
                        {items.map((currElem) => {
                            return (
                                <div className="eachItem" key={currElem.id}>
                                    <h3>{currElem.name}</h3>
                                    <div className="todo-btn">
                                        <i className="far fa-edit add-btn" onClick={() => editItem(currElem.id)}></i>
                                        <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(currElem.id)}></i>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                    <div className="showItems"><button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span>Check List</span></button></div>
                </div>
            </div>
        </>
    )
}

export default Todo
