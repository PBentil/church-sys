import React from 'react';
import { Table } from 'antd';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTable} from "@fortawesome/free-solid-svg-icons";

interface TableComponentProps {
    columns: any[];
    data: any[];
    title?: string;
}

const TableComponent: React.FC<TableComponentProps> = ({ title, columns, data }) => {
    const isDataEmpty = !data || data.length === 0;
    return (
        <div className="bg-white p-4 shadow-lg rounded-lg w-full">
            {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
            {isDataEmpty ?( <div className="text-center text-gray-500 text-xl mt-10 block"><FontAwesomeIcon icon={faTable} /> No data avaliable</div>):(
                <Table columns={columns} dataSource={data} pagination={true}   scroll={{ x: 'max-content' }} />
            )}
        </div>
    );
};

export default TableComponent;
