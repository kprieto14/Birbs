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
        <div style={{display: "flex", alignItems: "center", gap:"5px"}}>
            <span>{text}</span> {reactIcon } 
        </div>
    )
}
 
export default IconCenter