import React from 'react';
/***
 *
 * @param {string} path
 * @returns {string} 获取文件名字
 */
function getOwnName (path: string) {
  return  path.replace(/.+\/([^\.\/]+)\.ts\w?$/, "$1");
}

 /**
  *
  * @param {string} path
  * @returns {string} 获取当前匹配路径的名字
  */
 export function getRelatevePage(path: string) {
   if(path.indexOf("/") === -1) return path;
   return path.replace(/.*\/(\w+$)/, "$1");
 }
 interface RouterComponent {
   path: string,
   component: React.ComponentClass,
   name: string
 }
 interface Pages {
   [name: string] : RouterComponent[]
 }
 
const pageArr: Pages = {} ;
 ((t) => {
   t.keys().map((item) => {
     pageArr[getOwnName(item)]  = t(item).default ;
   })
 })(require.context("./pages", true, /.ts\w?$/));

export default pageArr

 