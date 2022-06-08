import {applyMiddleware, compose, legacy_createStore as createStore} from 'redux';
import { rootReducer } from './rootReducer';
import thunk from 'redux-thunk';

const middleWare = [thunk];
const composeEnhancers = (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleWare)));

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch