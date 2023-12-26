import { Skeleton } from '@/components/ui/skeleton';
import clsx from 'clsx';
import React from 'react';

const LoaderPlaceOrder = ({ className }: { className: string; }) => {
    return (
        <div className={clsx("box-radius bg-white", className)}>
            <section className="p-4 pb-0">
                <Skeleton className="box-radius w-full h-8" />
                <section className="flex flex-col gap-4 mt-4">
                    <Skeleton className="box-radius w-full h-16" />
                    <Skeleton className="box-radius w-full h-16" />
                    <Skeleton className="box-radius w-full h-16" />
                    <Skeleton className="box-radius w-full h-16" />
                </section>
                <section className="mt-6">
                    <Skeleton className="rounded-full w-full h-16" />
                </section>
                <section className="mt-[158px] p-4 pb-5 flex flex-col gap-2">
                    <Skeleton className="box-radius w-full h-6" />
                    <Skeleton className="box-radius w-full h-6" />
                </section>
            </section>
        </div>
    );
};

export default LoaderPlaceOrder;
