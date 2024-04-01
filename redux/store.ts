import { configureStore, createSlice } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const initialStatePaymentState: { selectedService?: number } = {};

export const paymentState = createSlice({
  name: 'paymentState',
  initialState: initialStatePaymentState,
  reducers: {
    setSelectedService: (state, action) => {
      state.selectedService = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.paymentState,
      };
    },
  },
});

export enum PopupType {
  TERMS_OF_USE = 'TERMS_OF_USE',
  QR = 'QR',
  CANCEL = 'CANCEL',
  LOADING = 'LOADING',
  EXCEPTION = 'EXCEPTION',
}

const initialStatePaymentPopupState: {
  TERMS_OF_USE: boolean;
  QR: boolean;
  CANCEL: boolean;
  LOADING: boolean;
  EXCEPTION: boolean;
} = {
  TERMS_OF_USE: false,
  QR: false,
  CANCEL: false,
  LOADING: false,
  EXCEPTION: false,
};

export const paymentPopupState = createSlice({
  name: 'paymentPopupState',
  initialState: initialStatePaymentPopupState,
  reducers: {
    open: (state, action) => {
      state[action.payload] = true;
    },
    close: (state, action) => {
      state[action.payload] = false;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.paymentPopupState,
      };
    },
  },
});

const makeStore = () =>
  configureStore({
    reducer: {
      [paymentState.name]: paymentState.reducer,
      [paymentPopupState.name]: paymentPopupState.reducer,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const wrapper = createWrapper<AppStore>(makeStore);

export const { setSelectedService } = paymentState.actions;
export const { open, close } = paymentPopupState.actions;
