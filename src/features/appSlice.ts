import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { newsOnPage } from '../components/News';

interface InitialState {
  active: number | null;
  news: Array<any>;
  newsDisplayed: number;
  search: string;
  section: string;
}

const initialState: InitialState = {
  active: null,
  news: [{section: 'Search', news: []}],
  newsDisplayed: newsOnPage,
  search: '',
  section: 'All'
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setActive: (state, action: PayloadAction<number | null>) => {
      state.active = action.payload;
    },
    setNews: (state, action: PayloadAction<{section: string, news: Array<any>}>) => {
      state.news.push(action.payload);
    },
    setNewsDisplayed: (state, action: PayloadAction<number>) => {
      state.newsDisplayed = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<object>) => {
      state.news[0].news = action.payload;
    },
    setSection: (state, action: PayloadAction<string>) => {
      state.section = action.payload;
      state.active = null;
    }
  }
});

export const {
  setActive,
  setNews,
  setNewsDisplayed,
  setSearch,
  setSearchResults,
  setSection
} = appSlice.actions;
export default appSlice.reducer;
