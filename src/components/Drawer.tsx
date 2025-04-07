// CustomDrawer.tsx
import React from 'react';
import { Drawer } from 'antd';

interface CustomDrawerProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    width?: number; // Allow custom width
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({
                                                       open,
                                                       onClose,
                                                       title = 'Drawer',
                                                       children,
                                                       width = 400, // Default width
                                                   }) => {
    return (
        <Drawer
            title={title}
            placement="right"
            onClose={onClose}
            open={open}
            width={width}
            destroyOnClose
            closable
        >
            {children} {/* 👈 Show anything passed inside */}
        </Drawer>
    );
};

export default CustomDrawer;
