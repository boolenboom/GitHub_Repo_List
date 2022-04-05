import { useEffect, useState } from "react";
import languageColor from '../json/languageColors.json';
import ProgramLanguage from "./units/programLanguage.jsx";

import '../stylesheets/languageRatio.scss'

export default function LanguageRatio({url}){
    const [ratio, setRatio] = useState({});
    useEffect(()=>{
        if(url!==undefined){
            fetch(url)
            .then(res=>res.json())
            .then((data)=>{
                setRatio(data);
            })
        }
    },[url]);

    const [progressComposite, setProgressComposite] = useState([]);
    function percentRound(num){
        return +(Math.round(num * 100 + 'e+2') + 'e-2');
    }
    useEffect(()=>{
        const keys = Object.keys(ratio);
        let sum = 0;
        keys.forEach(el=>{
            sum += ratio[el];
        })
        setProgressComposite(keys.map(key=>{
            return (<span key={'ratio' + key} style={{backgroundColor:languageColor[key].color, width:`${ percentRound(ratio[key] / sum) }%`}}></span>)
        }))
    },[ratio])

    const [itemList, setItemList] = useState([])
    useEffect(()=>{
        const keys = Object.keys(ratio);
        let sum = 0;
        keys.forEach(el=>{
            sum = sum + ratio[el];
        })
        setItemList(keys.map(key=>{
            return (
                <li key={'label' + key}>
                    <ProgramLanguage lan={key} opt={`${ percentRound(ratio[key] / sum) }%`}></ProgramLanguage>
                </li>
            )
        }))
    },[ratio])

    return (
        <div className="language-ratio">
            <span className="progress">
                {progressComposite}
            </span>
            <ul className="d-flex x-axis-center wrap">
                {itemList}
            </ul>
        </div>
    )
}