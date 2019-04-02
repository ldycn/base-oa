/*
*  组件
* */
import React from 'react';
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
const simpleHoc = (ComponentNode: any) => {
  return class extends React.Component<any>{
    static defaultProps = {
      data: row,
      tableTop: ["Dessert (100g serving)", "Calories", "Fat (g)", "Carbs (g)", "Protein (g)"]
    }
    render() {
      return (
          <div>
            <h1>{this.props.name}</h1>
            <ComponentNode {...this.props} />
          </div>
      )
    }
  }
}

export default simpleHoc
