/*
*  组件
* */
import { WithStyles } from '@material-ui/core/styles';
import React, { SFC } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

interface Props extends WithStyles {
  style: object,
  children: any,
}

const GrayCard = (props: Props) => (
  <Card className={props.classes.card}>
    <CardContent>
      {props.children}
    </CardContent>
  </Card>
);

export default GrayCard;
