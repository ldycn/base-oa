/*
*  组件
* */
import React from 'react';
interface Params {
  isLoading: boolean,
  error: string,
  [name: string]: any
}
const MyLoadingComponent = ({ isLoading , error, b }: Params) => {
  // Handle the loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }
  // Handle the error state
  else if (error) {
    return <div>Sorry, there was a problem loading the page.</div>;
  }
  else {
    return null;
  }
};

export default MyLoadingComponent
