import Loadable from 'react-loadable';
import MyLoadingComponent from '../../componentsUnit/routerLoading'
const Home1 = Loadable({
  loader: ()=> import('../../layouts/home1-1'),
  loading: MyLoadingComponent
})
const Home2 = Loadable({
  loader: ()=> import('../../layouts/home1-2'),
  loading: MyLoadingComponent
})

export default [
  {
    path: "/home1-1",
    name: "home1",
    component: Home1
  },
  {
    path: "/home1-2",
    name: "home2",
    component: Home2
  }
]