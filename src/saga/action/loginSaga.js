import LoginService from "../service/login";
import {LOGIN_FAILURE, LOGIN_SAGA, LOGIN_SUCCESS, REQUEST} from "./const";
import {call, put, takeEvery, take, fork} from "redux-saga/effects";

function* loginHandle(action) {
    yield put({type: REQUEST});
    try {
      // 获取用户基本信息
      let res1 = yield call(LoginService.login, action.payload);
      // 获取用户更多信息
      let res2 = yield call(LoginService.getMoreUserInfo, res1);
      yield put({type: LOGIN_SUCCESS, payload: res2});
    } catch (err) {
      yield put({type: LOGIN_FAILURE, payload: err});
    }
}

// watcher saga
function* loginSaga() {
    yield takeEvery(LOGIN_SAGA, loginHandle);
    // while (true) {
    //   const action = yield take(LOGIN_SAGA);
    //   // call 阻塞
    //   // fork 非阻塞
    //   yield fork(loginHandle, action);
    //   console.log("总是想吃肉扎办"); //sy-log
    // }
}

export default loginSaga;