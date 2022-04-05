import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";


export default function Breadcrumbs(){
    let url = useLocation();
    const [items, setItems] = useState([])
    useEffect(()=>{
        console.log(url.pathname)
        if(url.pathname.length > 0 && url.pathname !== '/'){
            let routes = url.pathname.split('/');
            console.log(routes);
            setItems(routes.map((route,index)=>{
                if(index == 0) return <Link key={index} to={'/'}>首頁/</Link>
                let navUrl = url.pathname.slice(0, url.pathname.lastIndexOf(route))
                return (
                    <Link key={index} to={navUrl + route}>{route}/</Link>
                )
            }));
        }
        else{
            setItems([]);
        }
    },[url])

    return (
        <div className="breadcurmbs pos-fixed top">
            {items}
        </div>
    )
}