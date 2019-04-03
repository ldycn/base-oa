
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { WithStyles } from '@material-ui/core/styles';
import { BUTTON_ON_HOVER_COLOR, BUTTON_NOT_HOVER_COLOR } from './style.jss.tsx';

interface Props extends WithStyles {
  className: string,
  onClick: any,
  children: Element | string | number,
}

// TODO 设置字体颜色变化动画
const WrappedButton = (props: Props) => {
  const [textColor, setTextColor] = useState(BUTTON_NOT_HOVER_COLOR);
  
  const onMouseEnter = () => {
    setTextColor(BUTTON_ON_HOVER_COLOR)
  }

  const onMouseLeave = () => {
    setTextColor(BUTTON_NOT_HOVER_COLOR)
  }

  return (
    <Button
      className={props.className}
      onClick={props.onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span className={props.classes.buttonText} style={{ color: textColor }}>{props.children}</span>
    </Button>
  );
};

export default WrappedButton;
