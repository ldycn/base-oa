import Loadable from 'react-loadable';
import MyLoadingComponent from '../../componentsUnit/routerLoading'
const Home = Loadable({
  loader: ()=> import('../../layouts/home'),
  loading: MyLoadingComponent
})
export const p404 = Loadable({
  loader: ()=> import('../../layouts/page404'),
  loading: MyLoadingComponent
})

export const Test = Loadable({
  loader: () => import('../../components/com-print-out-from'),
  loading: MyLoadingComponent
})

export default [
  {
    path: "/desktop",
    name: "home1",
    component: Home
  }, {
    path: "/test",
    name: "test",
    component: Test
  }
]