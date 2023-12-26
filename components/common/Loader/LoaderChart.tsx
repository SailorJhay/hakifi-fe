import { Skeleton } from '@/components/ui/skeleton';
import clsx from 'clsx';
import React from 'react';

const LoaderChart = ({ className }: { className: string; }) => {
    return (
        <div className={clsx("box-radius bg-white", className)}>
            <div className="h-[60px] p-4 flex items-center justify-between border-b border-divider">
                <Skeleton className="!w-40 !h-1" />
                <Skeleton className="!w-40 !h-1" />
            </div>
            <div className="h-[590px] p-4 flex flex-col justify-between space-y-8">
                <div className="flex flex-col justify-between space-y-8">
                    <div className="flex items-center justify-between space-x-10">
                        <Skeleton className="w-10 h-1" />
                        <Skeleton className="w-20 h-1" />
                    </div>
                    <div className="flex items-center justify-between space-x-10">
                        <Skeleton className="w-10 h-1" />
                        <Skeleton className="w-20 h-1" />
                    </div>
                    <div className="flex items-center justify-between space-x-10">
                        <Skeleton className="w-10 h-1" />
                        <Skeleton className="w-20 h-1" />
                    </div>
                    <div className="flex items-center justify-between space-x-10">
                        <Skeleton className="w-10 h-1" />
                        <Skeleton className="w-20 h-1" />
                    </div>
                    <div className="flex items-center justify-between space-x-10">
                        <Skeleton className="w-10 h-1" />
                        <Skeleton className="w-20 h-1" />
                    </div>
                </div>
                <div className="flex justify-between space-x-3">
                    <Skeleton className="w-40 h-5" />
                    <Skeleton className="w-20 h-5" />
                    <Skeleton className="w-40 h-5" />
                    <Skeleton className="w-20 h-5" />
                    <Skeleton className="w-40 h-5" />
                </div>
            </div>
        </div>
    );
};

export default LoaderChart;
