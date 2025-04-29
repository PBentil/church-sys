import React from 'react';
import { Table, Spin } from 'antd';
import TlaEmpty from "./Empty.tsx";

interface TableComponentProps {
    columns: any[];
    data: any[];
    title?: string;
    loading?: boolean;
}

const TableComponent: React.FC<TableComponentProps> = ({ title, columns, data, loading = false }) => {
    const isDataEmpty = !data || data.length === 0;

    return (
        <div className="bg-white p-4 shadow-lg rounded-lg w-full min-h-[200px]">
            {loading ? (
                <div className="flex justify-center items-center h-[150px]">
                    <Spin size="large" tip="Loading..." />
                </div>
            ) : (
                <>
                    {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
                    {isDataEmpty ? (
                        <TlaEmpty />
                    ) : (
                        <Table
                            columns={columns}
                            dataSource={data}
                            pagination={true}
                            scroll={{ x: 'max-content' }}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default TableComponent;
