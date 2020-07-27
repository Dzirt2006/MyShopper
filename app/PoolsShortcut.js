import React from 'react';

export default function ListShortcut(props){
    const poolData=props.poolInfo;

    return (
        <div key={poolData.id}>
         <p>{poolData.poolName}</p>   
        </div>
    )
} 