import React from 'react';
import { Input, Row } from 'antd';
import Grid from '@material-ui/core/Grid';

interface Props {
  title: string,
  children: any,
  className?: string,
  xs: any,
}
const FormItem = (props: Props) => (
  <Grid item className={props.className} xs={props.xs}>
    <Row type="flex" justify="start" align="middle">{props.title}</Row>
    <Row type="flex" justify="start" align="middle">{props.children}</Row>
  </Grid>
)

export default FormItem;