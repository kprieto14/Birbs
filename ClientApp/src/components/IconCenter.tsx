import React from 'react';
import { FunctionComponent, ReactNode } from 'react';

type iconProps = {
    reactIcon: ReactNode
    text: string
}

const IconCenter: FunctionComponent<iconProps> = ({
    reactIcon,
    text
}) => {
    return (
        <div style={{ display: "flex", alignItems: "center", gap:"5px" }}>
            { reactIcon } <span>{text}</span>
        </div>
    )
}

export default IconCenter