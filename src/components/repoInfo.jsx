import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import APIFactory from "../plugin/fetcherFactory.js";
import LanguageRatio from "./languageRatio.jsx";
import Description from "./units/objectDesc.jsx";
import ObjectName from "./units/objectName.jsx";
import RepoProperty from "./units/repoProperty.jsx";

import '../stylesheets/repoInfo.scss'

export default function RepoInfo(){
    let [info, setInfo] = useState({});
    let url = useLocation();
    let params = useParams();
    let api = APIFactory('gitHubRepo');
    useEffect(()=>{
        console.log(params);
        api.getData('/repos/{owner}/{Repo}',{
            owner: params.username,
            Repo: params.repo
        },(data)=>{
            setInfo(data);
        })
    },[url]);

    return (
        <section className="repo-info container">
            <ObjectName name={info.fullname}></ObjectName>
            <div className="repo-status">
                <div className="status-about">
                    <RepoProperty type={'star'} count={info.stars}></RepoProperty>
                    <RepoProperty type={'watch'} count={info.watch}></RepoProperty>
                    <RepoProperty type={'forks'} count={info.forks}></RepoProperty>
                </div>
                <div className="status-language">
                    <h3>Languages</h3>
                    <LanguageRatio url={info.languageRatio} size={info.size}></LanguageRatio>
                </div>
                <div className="status-desc">
                    <h3>Description</h3>
                    <Description desc={info.desc}></Description>
                </div>
            </div>
            
            <a className="outer-link" href={info.repourl}>{' 前往GitHub頁面 ->'}</a>
        </section>
    )
}