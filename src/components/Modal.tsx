// CustomModal.tsx
import React from 'react';
import {Modal} from 'antd';

interface CustomModalProps {
    open: boolean,
    onCancel: () => void,
    title?: string,
    children: React.ReactNode,
    isOpen?: boolean,
    onClose?: () => void
}

const CustomModal: React.FC<CustomModalProps> = ({
                                                     open,
                                                     onCancel,
                                                     title = 'Modal',
                                                     children
                                                 }) => {
    return (
        <Modal
            title={title}
            open={open}
            onCancel={onCancel}
            footer={null}  // ❌ no default buttons
        >
            {children} {/* 👈 show whatever is passed */}
        </Modal>
    );
};

export default CustomModal;
