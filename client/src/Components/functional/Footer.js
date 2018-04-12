import React from 'react';

const Footer = ({footer})=>{
    footer = footer || [];
    return(
        
        footer.map(footerSec => {
            
            return <div className="footerSections">
                <FooterSection footerSec={footerSec} />
            </div>
            
        })
        
    );
}

const FooterSection = ({footerSec}) => {
    return (
        footerSec.map(section => {
            if((typeof section) === "string"){
                return <FooterSubSec data={section} key={Math.floor(Math.random()*1000)} />
            }else{
                return <FooterSubSec data={section} key={Math.floor(Math.random()*1000)} />
            }
        })
    );
}

const FooterSubSec = ({data}) => {

    if(typeof data === 'string'){
        return (
            <div className='footerSubSectionHeader'>
                <span>{data}</span>
            </div>
        );
    }else{
        let key = Object.keys(data)[0];
        return (
            <div className='footerSubSectionHeader'>
                <span>{key}</span>
                <div className='footerSubSectionContent'>
                    <FooterSubSecContent data={data[key]} />
                </div>
            </div>
        );
    }
}

const FooterSubSecContent = ({data}) => {
    return (
        data.map(subData => {
            return <div key={Math.floor(Math.random()*1000)}>{subData}</div>
        })
    );
};

export {Footer};