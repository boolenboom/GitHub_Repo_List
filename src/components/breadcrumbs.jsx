import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";


export default function Breadcrumbs(){
    let url = useLocation();
    const [items, setItems] = useState([])
    useEffect(()=>{
        console.log(url.pathname)
        if(url.pathname.length > 0 && url.pathname !== '/'){
            let routes = url.pathname.split('/');
            console.log(routes);
            setItems(routes.map((route,index)=>{
                if(index == 0) return <span key={index}>Location: <Link to={'/'}>首頁</Link></span> 

                let navUrl = url.pathname.slice(0, url.pathname.lastIndexOf(route))
                return (
                    <span key={index}> / <Link to={navUrl + route} className={`${routes.length - 1 == index ? 'current-location' : ''}`}>{route}</Link></span>
                )
            }));
        }
        else{
            setItems([]);
        }
    },[url])

    const [scrollDirection, setScroll] = useState('scrollDown');
    const [lastPos, setLastPos] = useState(0);
    function checkScrollDirection(){
        window.requestAnimationFrame(()=>{
            if(window.scrollY <= lastPos) {setScroll('scrollUp');}
            else{
                setScroll('scrollDown')
            }
            setLastPos(window.scrollY);
        })
    }
    useEffect(()=>{
        window.addEventListener('scroll', checkScrollDirection);
        return ()=>{window.removeEventListener('scroll', checkScrollDirection)};
    })

    return (
        <div className={"breadcrumb pos-fixed top " + scrollDirection}>
            {items}
        </div>
    )
}