import classnames from 'classnames';
import React from 'react';
import styled from 'styled-components';

interface ILoadingProps {
    size: 'small' | 'large' | 'xs';
}

const Loading = ({ size = 'large' }: ILoadingProps) => {
    return (
        <Loader size={size}>
            <div
                className={classnames('bg-white flex items-center justify-center rounded-full', {
                    'w-[calc(4rem-30px)] h-[calc(4rem-30px)] ': size === 'xs',
                    'w-[calc(5rem-30px)] h-[calc(5rem-30px)] ': size === 'small',
                    'w-[calc(7rem-40px)] h-[calc(7rem-40px)] ': size === 'large',
                })}
            />
        </Loader>
    );
};

const Loader = styled.div.attrs<ILoadingProps>(({ size }) => ({
    className: classnames('gradient-spin animate-spin-reverse flex items-center justify-center rounded-full relative', {
        'after:!w-[15px] after:!h-[15px] w-[4rem] h-[4rem] ': size === 'xs',
        'after:!w-[15px] after:!h-[15px] w-[5rem] h-[5rem] ': size === 'small',
        'after:!w-5 after:!h-5 w-[7rem] h-[7rem]': size === 'large',
    }),
})) <ILoadingProps>`
    &:after {
        content: '';
        position: absolute;
        background: #5563F7;
        width: 20px;
        height: 20px;
        bottom: 0;
        border-radius: 50%;
    }
`;
export default Loading;
