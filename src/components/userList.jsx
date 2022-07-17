import { useEffect, useState } from "react";
import APIFactory from "../plugin/fetcherFactory.js";

import User from './user.jsx';
export default function UserList(){
    let api = APIFactory('gitHubRepo');
    let [list, setList] = useState([]);
    let [lastId, setlastId] = useState(0);
    let [loadStatus, setLoadStatus] = useState('');
    function loadData(){
        setLoadStatus('Loading...');
        api.getData('/users?since={sinceNum}&per_page=10',{
            sinceNum: lastId
        }
        ,(data)=>{
            if(data.length < 10) {
                setLoadStatus('No more data.')
            }
            else{
                setLoadStatus('');
            };
            setlastId(data[data.length - 1].id);
            setList([...list,...data]);
        })
    }
    useEffect(()=>{
        loadData();
    },[])

    let dom = document.querySelector('body');
    useEffect(()=>{
        function checkReadProgress(){
            let totalHeight = dom.clientHeight - window.innerHeight;
            window.requestAnimationFrame(()=>{
                console.log(window.scrollY / totalHeight);
                if(window.scrollY / totalHeight > 0.99 && loadStatus !== 'Loading...'){
                    loadData();
                }
            })
        }
        window.addEventListener('scroll', checkReadProgress);
        return ()=>{window.removeEventListener('scroll', checkReadProgress)};
    })

    const [listItem, setListItem] = useState(null);
    useEffect(()=>{
        let ary = list;
        if(ary.length > 0){
            setListItem(ary.map((item)=>(
                <User props={item} key={item.id+item.username}></User>
            )))
        }
    },[list])

    return (
        <div className="users">
            <h2>想看誰的Repos？</h2>
            <ul className="user-list d-flex y-axis-center wrap">
                {listItem}
                <li className="load-msg">{loadStatus}</li>
            </ul>
        </div>
    )
}