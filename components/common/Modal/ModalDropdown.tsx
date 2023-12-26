"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import React, { ReactNode } from "react";
import { BACKGROUND_VARIANTS, BODY_VARIANTS } from "./variants";

type TProps = {
    children: ReactNode;
    classBody?: string;
    classParent?: string;
};

const ModalDropdown = ({ classBody, classParent, children }: TProps) => {
    return (
        <motion.div
            className={clsx(
                'fixed top-0 z-40 h-full w-full overflow-y-auto bg-black/40 backdrop-blur-[40px] mt-17 transition-all duration-300 ease-in-out',
                classParent
            )}
            variants={BACKGROUND_VARIANTS}
        >
            <motion.div variants={BODY_VARIANTS} className={clsx('bg-white rounded-es-[20px] rounded-ee-[20px] p-4 flex flex-col items-end border-t-[1px] border-light-1', classBody)}>
                {children}
            </motion.div>

        </motion.div>
    );
};

export default ModalDropdown;