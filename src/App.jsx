import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import UserRepos from './components/userRepos.jsx'
import UserList from './components/userList.jsx'
import './stylesheets/App.css'
import RepoInfo from './components/repoInfo.jsx'
import Home from './components/home.jsx'
import Breadcrumbs from './components/breadcrumbs.jsx'

function App() {
  let url = useLocation();

  return (
    <div className="App">
      <header className="App-header">
        <Breadcrumbs></Breadcrumbs>
        <Routes>
          <Route path='/users/:username/repos/:repo' element={<RepoInfo></RepoInfo>}/>
          <Route path='/users/:username/repos' element={<UserRepos></UserRepos>}/>
          <Route path='/users/:username' element={<Navigate replace to={url.pathname+'/repos'}></Navigate>}/>
          <Route path='/users' element={<UserList></UserList>}/>
          <Route path='/' element={<Home></Home>}/>
        </Routes>
      </header>
    </div>
  )
}

export default App
