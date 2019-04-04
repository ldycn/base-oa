/*
*  组件
* */
import { WithStyles } from '@material-ui/core/styles';
import React, { SFC } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import SvgIcon from '@material-ui/core/SvgIcon';

interface Props extends WithStyles {
  style: object,
  children: any,
}

const GrayCard = (props: Props) => (
  <Card className={props.classes.card}>
    <CardContent>
      <SvgIcon>
        <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
      </SvgIcon>
      {props.children}
    </CardContent>
  </Card>
);

export default GrayCard;
