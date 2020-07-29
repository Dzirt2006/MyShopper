import React from 'react';
import { Link } from 'react-router-dom';

export default function ListShortcut(props) {
    const poolData = props.poolInfo;

    return (
        <div key={poolData.id}>
            <Link to={{ pathname: `/pool/${poolData.id}` }}>{poolData.poolName}</Link>
        </div>
    )
} 