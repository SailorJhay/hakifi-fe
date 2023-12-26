import React from 'react';

const ChevronBottomTriangleIcon = ({ color, ...props }: React.SVGProps<SVGSVGElement>) => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M8.59326 11.6075C9.37261 12.3789 10.6277 12.3789 11.4071 11.6075L14.6796 8.36859C15.1875 7.86583 14.8315 7 14.1168 7L5.88353 7C5.16881 7 4.81279 7.86583 5.32076 8.36859L8.59326 11.6075Z" fill={color || "#768394"} />
        </svg>

    );
};

export default ChevronBottomTriangleIcon;
