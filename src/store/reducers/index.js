import {combineReducers} from 'redux';

import user from './UserReducer';
import customer from './CustomerReducer';
import loan from './LoanReducer';
import vale from './ValeReducer';
import confiashop from "./ConfiaShopReducer";

export default combineReducers({
    user,
    customer,
    loan,
    vale,
    confiashop
})