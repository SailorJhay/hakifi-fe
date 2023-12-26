import { Toast, ToastDescription, ToastProvider, ToastViewport } from "@/components/ui/toast";
import { NOTIFICATIONS } from "@/utils/constant";
import { AnimatePresence, motion } from "framer-motion";
import React, { ReactNode } from "react";
import CheckIcon from "../Icons/CheckIcon";
import ErrorIcon from "../Icons/ErrorIcon";
import WarningIcon from "../Icons/WarningIcon";

const NotificationContext = React.createContext<{
    success: (message: string) => void;
    error: (message: string) => void;
    warning: (message: string) => void;
}>({
    success: () => { },
    error: () => { },
    warning: () => { }
});
interface INotificationProps {
    position?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
    children: ReactNode;
}

interface Notification {
    type: NOTIFICATIONS;
    message: string;
}

const prefixIcon = (type: NOTIFICATIONS) => {
    if (type === NOTIFICATIONS.SUCCESS) return <CheckIcon />;
    if (type === NOTIFICATIONS.ERROR) return <ErrorIcon />;
    if (type === NOTIFICATIONS.WARNING) return <WarningIcon />;

};

const Notifications = ({ position = 'topLeft', children }: INotificationProps) => {
    const [notifications, setNotifications] = React.useState(new Map<string, Notification>());
    const isPositionedTop = position === "topLeft" || position === "topRight";

    const handleAddToast = React.useCallback((toast: Notification) => {
        setNotifications((prev) => {
            const newMap = new Map(prev);
            newMap.set(String(Date.now()), { ...toast });
            return newMap;
        });
    }, []);

    const handleRemoveToast = React.useCallback((key: string) => {
        setNotifications((prev) => {
            const newMap = new Map(prev);
            newMap.delete(key);
            return newMap;
        });
    }, []);

    const handleDispatchSuccess = React.useCallback(
        (message: string) => handleAddToast({ message, type: NOTIFICATIONS.SUCCESS }),
        [handleAddToast]
    );

    const handleDispatchError = React.useCallback(
        (message: string) => handleAddToast({ message, type: NOTIFICATIONS.ERROR }),
        [handleAddToast]
    );

    const handleDispatchWarning = React.useCallback(
        (message: string) => handleAddToast({ message, type: NOTIFICATIONS.WARNING }),
        [handleAddToast]
    );

    return (
        <NotificationContext.Provider
            value={React.useMemo(
                () => ({
                    success: handleDispatchSuccess,
                    error: handleDispatchError,
                    warning: handleDispatchWarning
                }),
                [handleDispatchSuccess, handleDispatchError, handleDispatchWarning]
            )}
        >
            <ToastProvider>
                {children}
                <AnimatePresence>
                    {Array.from(notifications).map(([key, notification]) => {
                        const { type, message } = notification;
                        return (
                            <Toast
                                onOpenChange={(open) => {
                                    if (!open) handleRemoveToast(key);
                                }}
                                key={key}
                                asChild
                                forceMount
                            >
                                <motion.li
                                    initial={{
                                        y: isPositionedTop ? -100 : 100,
                                        scale: 0.6,
                                        opacity: 0
                                    }}
                                    animate={{
                                        y: 0,
                                        scale: 1,
                                        opacity: 1,
                                        transition: { duration: 0.3 }
                                    }}
                                    exit={{
                                        scale: 0.9,
                                        opacity: 0,
                                        transition: { duration: 0.15 }
                                    }}
                                    layout
                                >
                                    <div
                                        style={{ display: "flex", gap: 14, alignItems: "center" }}
                                    >
                                        <div className="flex items-center justify-center w-6 h-6 rounded-full" aria-hidden>
                                            {
                                                prefixIcon(type)
                                            }
                                        </div>

                                        <div>
                                            {/* <ToastTitle>{message}</ToastTitle> */}
                                            <ToastDescription>
                                                {message}
                                            </ToastDescription>
                                        </div>
                                    </div>
                                </motion.li>
                            </Toast>
                        );
                    })}
                </AnimatePresence>

                <ToastViewport position={position} />
            </ToastProvider>
        </NotificationContext.Provider>
    );
};

function useNotification() {
    const context = React.useContext(NotificationContext);
    if (context) return context;
    throw new Error("useNotification must be used within Notifications");
}

/* -----------------------------------------------------------------------------------------------*/

export { Notifications, useNotification };
