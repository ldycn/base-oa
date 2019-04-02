/*
*  组件
* */
import { WithStyles } from '@material-ui/core/styles';
import React from 'react';
import PropTypes from 'prop-types';

import {Table,TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';


let id = 0;
function createRow(name: string, calories: number, fat: number, carbs: number, protein: number) {
  id ++;
  return { id, name, calories, fat, carbs, protein };
}
const row = [
  createRow('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createRow('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createRow('Eclair', 262, 16.0, 24, 6.0),
  createRow('Cupcake', 305, 3.7, 67, 4.3),
  createRow('Gingerbread', 356, 16.0, 49, 3.9)
]
interface Data {
  id: number,
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
}
export interface Props extends WithStyles {
  data: Data [],
  tableTop: string[]
}
class Tables extends React.Component<Props> {
  static defaultProps = {
    data: row,
    tableTop: ["Dessert (100g serving)", "Calories", "Fat (g)", "Carbs (g)", "Protein (g)"]
  }
  render() {
    const {classes, data , tableTop} = this.props
    return (
      <Table>
        <TableHead>
          <TableRow>
            {
              tableTop.map((item, index) =>
                <TableCell key ={index}>
                  {item}
                </TableCell>
              )
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data.map((row) =>
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
    )
  }
}
(Tables as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired,
} as any;

export default Tables
