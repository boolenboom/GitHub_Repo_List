import { useEffect, useState } from 'react';
import Repo from './repo.jsx'

function RepoList({list, msg}){
    const [listItem, setListItem] = useState(null);
    useEffect(()=>{
        let ary = list;
        if(ary.length > 0){
            setListItem(ary.map((item)=>(
                <Repo props={item} key={item.id}></Repo>
            )))
        }
    },[list])

    return (
        <ul className='list repo-list container'>
            {listItem}
            <li className="load-msg">{msg}</li>
        </ul>
    )
}

export default RepoList