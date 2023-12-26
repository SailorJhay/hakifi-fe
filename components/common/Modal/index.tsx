import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogOverlay, DialogTitle } from '@/components/ui/dialog';
import clsx from 'clsx';
import { ReactNode, useEffect } from 'react';
import { Props } from 'react-modal';

interface IModal extends Props {
  variant?: 'primary' | 'danger';
  title: string | ReactNode;
  isMobileFullHeight?: boolean;
  children: any;
  isOpen: boolean;
  overlayClassName?: string;
  onRequestClose: () => void;
}

const Modal = ({
  children,
  overlayClassName,
  className,
  variant = 'primary',
  onRequestClose,
  title,
  isOpen,
  ...rest
}: IModal) => {
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onRequestClose} {...rest}>
        {isOpen && <DialogOverlay className={clsx('', overlayClassName)} />}
        <DialogContent>
          <DialogHeader>
            <DialogTitle className={clsx('sub-heading-mobile md:sub-heading-desktop', {
              'text-primary-3': variant === 'primary',
              'text-danger': variant === 'danger',
              className
            })}>{title}</DialogTitle>
            <DialogDescription asChild className='!mt-5'>
              {children}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Modal;
