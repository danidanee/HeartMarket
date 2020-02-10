import {
  createAsyncAction,
  ActionType,
  createAction,
  createReducer
} from "typesafe-actions";
import { Post } from "../lib/api";
import { AxiosError } from "axios";
import { ThunkAction } from "redux-thunk";
import { RootState } from ".";
import { getPost } from "../lib/api";

// 액션 타입
export const GET_POST = "post/GET_POST";
export const GET_POST_SUCCESS = "post/GET_POST_SUCCESS";
export const GET_POST_FAILURE = "post/GET_POST_FAILURE";

// 액션 객체 생성함수 선언
export const getPostAsync = createAsyncAction(
  GET_POST,
  GET_POST_SUCCESS,
  GET_POST_FAILURE
)<undefined, Post, AxiosError>();

// 액션 객체 타입 준비
export type PostAction = ActionType<typeof getPostAsync>;

// ThunkAction 의 Generics 에는 다음 값들을 순서대로 넣어줍니다.
/*
  1. thunk 함수에서 반환하는 값의 타입
  2. 리덕스 스토어의 상태 타입
  3. Extra Argument (https://github.com/reduxjs/redux-thunk#injecting-a-custom-argument)
  4. thunk 함수 내부에서 디스패치 할 수 있는 액션들의 타입
*/
export function getPostThunk(
  id: number
): ThunkAction<void, RootState, null, PostAction> {
  return async dispatch => {
    const { request, success, failure } = getPostAsync;
    dispatch(request());
    try {
      const postData = await getPost(id);
      dispatch(success(postData));
    } catch (e) {
      dispatch(failure(e));
    }
  };
}

// Reducer
// 초기 상태 type 설정
export type PostState = {
  loading: {
    GET_POST: boolean;
  };
  post: any;
};

const initialState: PostState = {
  loading: {
    GET_POST: false
  },
  post: null
};

const post = createReducer<PostState, PostAction>(initialState, {
  [GET_POST]: state => {
    return {
      ...state,
      loading: {
        GET_POST: true
      }
    };
  },
  [GET_POST_SUCCESS]: (state, action) => {
    return {
      loading: {
        GET_POST: false
      },
      post: action.payload
    };
  },
  [GET_POST_FAILURE]: (state, action) => ({
    ...state,
    loading: {
      GET_POST: false
    }
  })
});
export default post;
