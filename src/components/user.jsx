import { Link } from "react-router-dom";

export default function User({props}){
    return (
        <li className="user">
            <Link to={`/users/${props.username}/repos`} className='d-flex x-axis-center y-axis-average'>
                <img src={props.avatarurl} alt="user icon" />
                <span>{props.username}</span>
            </Link>
        </li>
    )
}