import React,{useState, useRef, useMemo} from 'react'
import './Homepage.css'
import {v4 as uuidv4} from 'uuid';

const Homepage = () => {

    const [todolist, setTodolist] = useState([]);
    const [page, setPage] = useState(true);

    

    const input_todo_list = useRef(null);
  

   

   //manage count
   function count_function(){
        let count=todolist.length;
    let complete_count= todolist.filter((item)=> item.completed=== true).length;

       return(
        <>
        <p>Total: {count}</p>
        <p>Completed: {complete_count}</p>
        </>
       )
   }
    
    //adding todolist on clicking button
   function add_TodoList_function(){
        const new_todo = input_todo_list.current.value;

        setTodolist([...todolist, {text:new_todo, completed:false, id:uuidv4() }])
   }
   //function to alert
        function check_function(){
            alert("Please enter a task to add in todo-list");
        }

       

   //render when todolist changes
   let manage_todolist = useMemo(()=>{ 
    
           
          
           let collection= todolist.map((item)=>{
            return (
                <div className="single_todo_item" key={item.id} >
                    
                    <input type="checkbox" checked={item.completed}   onClick={()=> checkbox_function(item.id)} />
                    <p >{item.text}</p>
                    <button className="edit_button" onClick={()=> edit_todo(item.id)}>Edit</button>
                    <button className='delete_button' onClick={()=> delete_todo(item.id)}> Delete</button>
                </div>
            )
           })
              return collection;}
              
   , [todolist]);

  


   //checkbox function
   function checkbox_function(id){
        const new_todo_list = todolist.map((item,index)=>{
            if(item.id ===id){
                 
                    document.getElementsByClassName("single_todo_item")[index].classList.toggle("line_through");
                 

                return {...item, completed: !item.completed}
                
            }else{
                return {...item}
            }}
        );
      setTodolist(new_todo_list);
    }


   //editing todo item
    function edit_todo(id){
        input_todo_list.current.value= todolist.find((item)=> item.id === id).text;
        delete_todo(id);
    }


   //deleting todo item
    function delete_todo(id){
        const new_todo_list = todolist.filter((item)=> item.id !== id);
        setTodolist(new_todo_list);
    }
 
    //convert the UI
    function convert_UI()
    {
         setPage(false);
         
    }  

  return (
    <div className="full_container">

         
      {page ?
      (
        <div className="front_first">
                
               <p >Let's write our todo-list</p>
               <button onClick={()=>convert_UI()} className="start_add_button" >Add</button>

        </div>
     )
      :
      (
            <div className="back_second">

                <p className="header_line">Let's write our todo-list</p>
                
                <div className="input_container">
                     <input 
                     ref={input_todo_list}
                     className="input_text"  placeholder="Task to do..." type="text"/>
                  
                    <button 
                    onClick={()=>{
                       add_TodoList_function();
                      input_todo_list.current.value= ""; 
                      
                   
                    }}  className="add_button" >Add</button>

                </div>

                <div className="todolist_container">
                    {manage_todolist}
                </div>

                <div className="count_container">
                  {count_function()}
                </div>
                
            </div>      
  

  )}


    </div>
  )
}

export default Homepage
