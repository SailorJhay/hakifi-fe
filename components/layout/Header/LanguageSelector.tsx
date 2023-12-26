"use client";

import React from 'react';

import { Button } from '../../ui/button';
import useLang from '@/hooks/useLang';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

function LanguageSelector({ ...props }) {
    const lang = useLang();
    const pathname = usePathname();
    const router = useRouter();

    const changeLanguage = () => {
        const newLang = lang === 'vi' ? 'en' : 'vi';
        const newPathName = pathname.replace(`/${lang}`, `/${newLang}`);
        router.replace(newPathName);
    };

    return (
        <Button variant="default" onClick={changeLanguage} {...props}>
            {
                lang === 'vi' ? <Image
                    src='/assets/images/lang/vi.svg'
                    width={20}
                    height={20}
                    alt='Language image'
                /> : <Image
                    src='/assets/images/lang/en.svg'
                    width={20}
                    height={20}
                    alt='Language image'
                />
            }
        </Button>
    );
}

export default LanguageSelector;