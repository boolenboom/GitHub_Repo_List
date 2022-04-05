import { Link, useLocation } from "react-router-dom"
import ObjectName from "./units/objectName.jsx"
import ProgramLanguage from './units/programLanguage.jsx'
import RepoProperty from './units/repoProperty.jsx'
import Description from './units/objectDesc.jsx'

import '../stylesheets/repo.scss'

function Repo({props}){
    let url = useLocation();
    
    return (
        <li className="repo">
            <Link to={`${url.pathname}/${props.reponame}`}>
                <ObjectName name={props.reponame}></ObjectName>
                <Description desc={props.desc}></Description>
                <div className="repo-status d-flex x-axis-center">
                    <ProgramLanguage lan={props.mainLanguage}></ProgramLanguage>
                    <RepoProperty type={'star'} count={props.stars}></RepoProperty>
                </div>
            </Link>
        </li>
    )
}

export default Repo