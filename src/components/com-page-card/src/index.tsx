/*
*  组件
* */
import { withStyles, WithStyles } from '@material-ui/core/styles';
import React, { SFC } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

interface Props {
  classes: {
    card: string,
  },
}
const GrayCard: SFC<Props> = (props) => (
  <Card className={props.classes.card}>
    <CardContent>
      qwfqwfqwfqwf
    </CardContent>
  </Card>
);

export default GrayCard;
