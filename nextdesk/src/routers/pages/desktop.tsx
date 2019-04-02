import Loadable from 'react-loadable';
import MyLoadingComponent from '../../componentsUnit/routerLoading'
const Home1 = Loadable({
  loader: ()=> import('../../layouts/home1'),
  loading: MyLoadingComponent
})
const Home2 = Loadable({
  loader: ()=> import('../../layouts/home2'),
  loading: MyLoadingComponent
})
const Home3 = Loadable({
  loader: ()=> import('../../layouts/home3'),
  loading: MyLoadingComponent
})
const Home4 = Loadable({
  loader: ()=> import('../../layouts/home4'),
  loading: MyLoadingComponent
});

export default [
  {
    path: "/home1",
    name: "home1",
    component: Home1
  },
  {
    path: "/home2",
    name: "home2",
    component: Home2
  },
  {
    path: "/home3",
    name: "home3",
    component: Home3
  },
  {
    path: "/home4",
    name: "home4",
    component: Home4
  }
]