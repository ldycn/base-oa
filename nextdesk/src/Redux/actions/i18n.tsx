export const changeEnglish = "changeEnglish";
export const changeChinese = "changeChinese";
import i18n from "../../i18n/i18n"

interface Action {
  type: String,
  payload?: Object,
}

/***
 *
 * @param {string} state
 * @param {Action} action
 * @returns {string}
 */
export default function counter(state = "cn", action: Action) {
  switch (action.type){
    case changeEnglish:
      i18n.changeLanguage('en');
      return state = "en" ;
    case changeChinese:
      i18n.changeLanguage('cn');
      return state = "cn";
    default: return "cn"
  }
}