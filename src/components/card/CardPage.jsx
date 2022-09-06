import React from 'react'
import { Warpper } from './style'
import { NavLink } from 'react-router-dom'
export default function CardPage({ title, number }) {
    return <>
        
        <Warpper>
            <NavLink to={"#"}>
                <div className='type'>{title}</div>
                <div className='number'>{number}</div>
            </NavLink>
        </Warpper>
    </>
}
