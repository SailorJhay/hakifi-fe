export const BACKGROUND_VARIANTS = {
    open: {
        opacity: 1,
        transition: {
            type: "spring",
            duration: 0.4,
            delayChildren: 0.3,
        }
    },
    closed: {
        opacity: 0,
        transition: {
            delay: 0.75,
        }
    }
};

export const BODY_VARIANTS = {
    open: {
        y: 0,
        transition: {
            duration: 0.6,
            staggerChildren: 0.025
        }
    },
    closed: {
        y: -170,
        transition: {
            duration: 0.4,
            delay: 0.3
        }
    }
};

export const ITEM_VARIANTS = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            y: { stiffness: 1000, velocity: -100 }
        }
    },
    closed: {
        y: -50,
        opacity: 0,
        transition: {
            duration: 0.6,
            y: { stiffness: 1000 }
        }
    }
};



