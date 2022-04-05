import { useEffect, useState } from 'react';
import languageColor from '../../json/languageColors.json';
import '../../stylesheets/programLanguage.scss';

function ProgramLanguage({lan, opt}){
    const [color, setColor] = useState('#ffffff');
    useEffect(()=>{
        if(lan && lan !== 'no language'){
            setColor(languageColor[lan].color);
        }
    },[lan])

    return (
        <span className='language status d-flex x-axis-center'>
            <div className="language-color" style={{backgroundColor:color}}></div>
            <span className="language-text">
                <strong>{lan}</strong>
                {opt}
            </span>
        </span>
    );
}

export default ProgramLanguage