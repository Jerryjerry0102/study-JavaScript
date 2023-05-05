import React, { CSSProperties, FC, MouseEvent, MouseEventHandler, ReactNode, useCallback } from 'react';
import { CloseMenuButton, CreateMenu } from '@components/Menu/styles';

interface Props {
  children: ReactNode;
  style: CSSProperties;
  show: boolean;
  onCloseMenu: MouseEventHandler;
  closeButton?: boolean;
}

const Menu: FC<Props> = ({ children, style, show, onCloseMenu, closeButton = true }) => {
  const stopPropagation = useCallback((e: MouseEvent) => {
    e.stopPropagation();
  }, []);
  return (
    <CreateMenu>
      <div style={style} onClick={stopPropagation}>
        {closeButton && <CloseMenuButton onClick={onCloseMenu}>&times;</CloseMenuButton>}
        {children}
      </div>
    </CreateMenu>
  );
};

export default Menu;
