import React, { FC, MouseEvent, MouseEventHandler, ReactNode, useCallback } from 'react';
import { CloseModalButton, CreateModal } from '@components/Modal/styles';

interface Props {
  children: ReactNode;
  show: boolean;
  onCloseModal: MouseEventHandler;
}

const Modal: FC<Props> = ({ children, show, onCloseModal }) => {
  const stopPropagation = useCallback((e: MouseEvent) => e.stopPropagation(), []);

  if (!show) return null;

  return (
    <>
      <CreateModal onClick={onCloseModal}>
        <div onClick={stopPropagation}>
          <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>
          {children}
        </div>
      </CreateModal>
    </>
  );
};

export default Modal;
