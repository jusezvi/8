import './Home.css';
import { useEffect, useState } from 'react';
import { exVar } from './ExtendVariables';
import Header from './Header';
import { navigation, Route, useLocation, Link, useNavigate } from "react-router-dom";
import BookList from './BookList';

import styles from "./styles/Heading/heading.module.css";
import Heading from './Heading';

import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies'





function Home({ route, navigation, setTest }) {

  const location = useLocation();
  const navigate = useNavigate();




  const [earnings, setEarnings] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [userID, setUserID] = useState(read_cookie('auth_access_token'));
  const [count, setCount] = useState(0);




  useEffect(() => {
    if (read_cookie('auth_access_token').length === 0) {
      navigate('/login')
    }
    callAPI(exVar.IS_NEW_EARNING)

  }, []);

  function callAPI(check = false) {
    if (!check) {
      return;
    }
    exVar.IS_NEW_EARNING = false;

  }

  // const [todos, setTodos] = useState([])

  // useEffect(() => {
  //   getTodosAPI().then(todos => setTodos(todos))
  // }, []);

  // const addTodo = (todo) => {
  //   postTodosAPI(todo).then(data => {
  //     setTodos([...todos, data])
  //   })
  // }

  // const updateTodo = (id, done) => {
  //   patchTodosAPI(id, (done) ? false : true).then(data => {
  //     if(data){
  //       console.log('updating records!!')
  //       getTodosAPI().then(todos => setTodos(todos))
  //     }
  //   })
  // }

  // const deleteTodo = (id) => {
  //   deleteTodosAPI(id).then(data => {
  //     if (data.deletedCount === 1) {
  //       setTodos(todos.filter(todo => todo._id !== id))
  //     }
  //   })
  // }

  return (
    <div className="home">
      <Header />
      <div className='main'>  
      <Heading>

      </Heading>

      <BookList> 

      </BookList>
     

      </div>
    </div>
  );
}

export default Home;