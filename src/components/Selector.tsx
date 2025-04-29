import React from 'react';


interface SelectorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    treeData: any[];
}

const Selector: React.FC<SelectorProps> = ({value , onChange , treeData, placeholder}) => {

    return (
            <Selector value={value} onChange={onChange} treeData={treeData} placeholder={placeholder} />
    );
};

export default Selector;