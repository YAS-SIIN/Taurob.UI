import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import missionsReducer from '../features/missions/missionsSlice';

export const store = configureStore({
  reducer: {
    missionsReducer: missionsReducer, 
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
