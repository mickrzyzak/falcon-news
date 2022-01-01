import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  section: string;
  active: number | null;
  news: Array<any>;
}

const initialState: InitialState = {
  section: 'All',
  active: null,
  news: []
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSection: (state, action: PayloadAction<string>) => {
      state.section = action.payload;
      state.active = null;
    },
    setActive: (state, action: PayloadAction<number | null>) => {
      state.active = action.payload;
    },
    setNews: (state, action: PayloadAction<{section: string, news: Array<any>}>) => {
      state.news.push(action.payload);
    }
  }
});

export const { setSection, setActive, setNews } = appSlice.actions;
export default appSlice.reducer;
