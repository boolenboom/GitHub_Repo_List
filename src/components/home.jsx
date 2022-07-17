import { Link } from "react-router-dom";

import logo from '../icon/github.svg';
import '../stylesheets/home.scss';

export default function Home(){
    return (
        <div className="home">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>GitHub Repos List</h1>
            <Link to={'/users'}>{'--> 點此閱覽使用者清單 <--'}</Link>
        </div>
    )
}