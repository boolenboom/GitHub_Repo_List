import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import RepoList from "./repoList.jsx";

import APIFactory from '../plugin/fetcherFactory.js';

export default function UserRepos(){
    const [list, setList] = useState([]);
    let url = useLocation();
    let { username } = useParams();

    let api = APIFactory('gitHubRepo');
    let [loadStatus, setLoadStatus] = useState('');
    let [nowPage, setPage] = useState(0);
    function loadData(){
        setLoadStatus('Loading...')
        api.getData(url.pathname + '?page={pageNum}&per_page=10',{
        pageNum: nowPage
        }, (data)=>{
            if(data.length < 10) {
                console.log('stop connect.');
                setLoadStatus('No more data.');
            }
            else{
                setLoadStatus('');
            }
            setList([...list,...data]);
            setPage(nowPage + 1);
        });
    }
    useEffect(()=>{
        loadData()
        console.log(url);
    },[url]);

    let dom = document.querySelector('body');
    useEffect(()=>{
        function checkListReadProgress(){
            if(loadStatus == 'No more data.') return;
            let totalHeight = dom.clientHeight - window.innerHeight;
            window.requestAnimationFrame(()=>{
                if(window.scrollY / totalHeight > 0.99 && loadStatus !== 'Loading...'){
                    loadData();
                }
            })
        }
        window.addEventListener('scroll', checkListReadProgress);
        return ()=>{window.removeEventListener('scroll', checkListReadProgress)};
    })

    return (
    <section className="user-repos">
        <div className="user-info">
            <img src={list[0]?.avatarurl || ''} alt="user icon" srcSet="" />
            <h2 className="username">{username}</h2>
        </div>
        <RepoList list={list} msg={loadStatus}></RepoList>
    </section>)
}