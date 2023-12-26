import React from 'react';

const WarningIcon = (props: React.SVGProps<SVGSVGElement>) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M12.8843 3.4657C12.5383 2.84477 11.4623 2.84477 11.1163 3.4657L2.11625 19.6062C1.95225 19.9005 1.96225 20.2556 2.14325 20.5395C2.32425 20.8253 2.64925 21 3.00025 21H21.0004C21.3514 21 21.6764 20.8253 21.8564 20.5405C22.0384 20.2556 22.0474 19.9005 21.8834 19.6072L12.8843 3.4657ZM13.0003 18.1517H11.0003V16.2528H13.0003V18.1517ZM11.0003 14.3539V9.60669H13.0003L13.0013 14.3539H11.0003Z" fill="#F1AE00" />
        </svg>

    );
};

export default WarningIcon;
