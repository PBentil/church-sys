import React from 'react';
import { Table } from 'antd';

interface TableComponentProps {
    columns: any[];
    data: any[];
    title?: string;
}

const TableComponent: React.FC<TableComponentProps> = ({ title, columns, data }) => {
    return (
        <div className="bg-white p-4 shadow-lg rounded-lg">
            {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
            <Table columns={columns} dataSource={data} pagination={true} />
        </div>
    );
};

export default TableComponent;
