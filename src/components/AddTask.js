import { useState } from "react"


const AddTask = ({onAdd}) => {

    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e)=>{
        e.preventDefault()

        if (!text) {
        alert('please add Task')
        return
    }
        
        onAdd ({text, day, reminder})
        setText('')
        setDay('')
        setReminder(false)

    }

    

    
    
    const addDay =()=>{

    }
    

  return (
    <form action="" className='add-form' onSubmit={onSubmit}>
        <div className="form-control">
            <label htmlFor="task">Task</label>
            <input type="text" placeholder='Add task' value={text}
            onChange={(e)=>{
                setText(e.target.value)
            }} />
        </div>
        <div className="form-control">
            <label htmlFor="task">Day $ Time</label>
            <input type="text" placeholder='Add Day and Time' value={day}
            onChange={(e)=>{
                setDay(e.target.value)
            }} />
        </div>
        <div className="form-control form-control-check">
            <label htmlFor="task">Reminder</label>
            <input type="checkbox"  checked={reminder}
            onChange={(e)=>{
                setReminder(e.currentTarget.checked)
            }}/>
        </div>
        <input type="submit" value="Save Task" className="btn btn-block"   />
    </form>
  )
}

export default AddTask
