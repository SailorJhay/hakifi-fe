"use client";
import FireIcon from '@/components/common/Icons/FireIcon';
import { TOKENS_DEFAULT } from '@/utils/constant';
import React, { memo } from 'react';
import FavoriteItem from './FavoritesItem';
import SwiperHorizontal from '@/components/common/Scolling/SwiperHorizontal';

function Favorites() {
    return (
        <section className="items-center flex box-radius py-2 px-4 bg-white">
            <div className="mr-4">
                <FireIcon />
            </div>
            <SwiperHorizontal arrow={true} arrowClassName="h-[50px]" >
                <section className="flex items-center" >
                    {
                        TOKENS_DEFAULT.map((token, index) => {
                            return <FavoriteItem key={token} asset={token} isFirst={index === 0} />;
                        })
                    }
                </section>
            </SwiperHorizontal>
        </section>
    );
}

export default memo(Favorites);