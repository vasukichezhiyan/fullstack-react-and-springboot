import './App.css'
import ListToDoComponent from './components/ListToDoComponent'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import TodoComponent from './components/TodoComponent'
import RegisterComponent from './components/RegisterComponent'
import LoginComponent from './components/LoginComponent'
import { isUserLoggedIn } from './services/AuthService'

function App() {

  function AuthenticatedRoute({children}){
    const isAuth = isUserLoggedIn();
    if(isAuth)
    {
      return children;
    }
    return <Navigate to="/"/>
  }

  return (
    <>
    <BrowserRouter>
      <HeaderComponent/>
      <Routes>
        <Route path='/' element = { <LoginComponent/> }></Route>
        <Route path='/todos' element = { 
          <AuthenticatedRoute>
            <ListToDoComponent/>
          </AuthenticatedRoute>
           }></Route>
        <Route path='/add-todo' element = { 
          <AuthenticatedRoute>
            <TodoComponent/>
          </AuthenticatedRoute>
           }></Route>
        <Route path='/update-todo/:id' element = { 
          <AuthenticatedRoute>
            <TodoComponent/>
          </AuthenticatedRoute>
           }></Route>
        <Route path='/register' element = { <RegisterComponent/> }></Route>
        <Route path='/login' element = { <LoginComponent/> }></Route>
      </Routes>
      <FooterComponent/>
    </BrowserRouter>
    </>
  )
}

export default App
