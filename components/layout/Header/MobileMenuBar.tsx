"use client"

import ModalDropdown from "@/components/common/Modal/ModalDropdown";
import { ITEM_VARIANTS } from "@/components/common/Modal/variants";
import { directWhitepaperPage } from "@/components/common/utils/header";
import { navigations } from "@/configs/navigations";
import useLang from "@/hooks/useLang";
import { useTranslationClient } from "@/i18n/client";
import clsx from "clsx";
import { motion } from "framer-motion";
import Link from 'next/link';
import { usePathname } from "next/navigation";

interface IProps {
    classBody?: string;
    classParent?: string;
}

const MobileMenuBar = ({ classBody, classParent }: IProps) => {
    const lang = useLang();
    const pathname = usePathname();
    const { t } = useTranslationClient('navigation');

    return (
        <ModalDropdown classBody={classBody} classParent={classParent}>
            {navigations.map((nav, index) => {
                const { href, title, blank } = nav
                let localeHref = `/${lang}${href}`;
                if (localeHref.endsWith('/'))
                    localeHref = localeHref.slice(0, localeHref.length - 1);
                const isActive =
                    href === pathname || pathname.startsWith(localeHref);
                return (
                    <motion.div
                        key={title}
                        variants={ITEM_VARIANTS}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={clsx(
                            'text-grey-1 text-lg font-medium hover:text-primary-1 hover:cursor-pointer duration-300',
                            isActive && 'text-primary-1',
                            index < navigations.length - 1 && 'mb-5'
                        )}
                    >
                        <Link
                            href={blank ? directWhitepaperPage(lang) : localeHref}

                            target={blank === true ? '_blank' : undefined}
                        >
                            {t(title)}
                        </Link>
                    </motion.div>
                );
            })}
        </ModalDropdown>
    );
};

export default MobileMenuBar;