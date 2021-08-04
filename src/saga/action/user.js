import LoginService from "../service/login";
import {LOGIN_FAILURE, LOGIN_SAGA, LOGIN_SUCCESS, REQUEST} from "./const";

export const login = (userInfo) => ({type: LOGIN_SAGA, payload: userInfo});