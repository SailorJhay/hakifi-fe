import React from 'react';

const IndicatorIcon = (props: React.SVGProps<SVGSVGElement>) => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M6.71632 11.7905L7.92434 8.7705C8.00832 8.56055 8.26868 8.48754 8.44958 8.62321L10.4812 10.147C10.6621 10.2826 10.9225 10.2096 11.0065 9.99967L12.2145 6.97963M17 17L13.85 13.85M15.6 9.3C15.6 12.7794 12.7794 15.6 9.3 15.6C5.82061 15.6 3 12.7794 3 9.3C3 5.82061 5.82061 3 9.3 3C12.7794 3 15.6 5.82061 15.6 9.3Z" stroke="#768394" strokeWidth="1.5" strokeLinecap="round" />
        </svg>


    );
};

export default IndicatorIcon;
