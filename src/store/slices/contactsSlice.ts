import { IForm } from '../../types';

import { createSlice, } from '@reduxjs/toolkit';
import { createContact } from '../thunks/contactsThunk.ts';
import { RootState } from '../../app/store.ts';

interface ContactState {
  isAddLoading: boolean;
  contacts:IForm[];
}

const initialState:ContactState   = {
  isAddLoading: false,
  contacts:[],
  // oneDish:null,

  // isFetchOneDishLoading: false,
  // isDeleteLoading: false,
  // isCreateLoading: false,
  // isEditLoading: false
};
export const selectAddLoading = (state: RootState) => state.contacts.isAddLoading;
//
// export const selectDishes = (state: RootState) => state.dishes.dishes;
// export const selectOneDish = (state: RootState) => state.dishes.oneDish;
// export const selectAddLoading = (state: RootState) => state.contacts;
// export const selectCreateDishLoading = (state: RootState) => state.dishes.isCreateLoading;
// export const selectEditDishLoading = (state: RootState) => state.dishes.isEditLoading;
// export const selectFetchOneDishLoading = (state: RootState) => state.dishes.isFetchOneDishLoading;


export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers:{},
  extraReducers:
    (builder) => {
    builder
      .addCase(createContact.pending, state => {
        state.isAddLoading = true;
      })
      .addCase(createContact.fulfilled, state => {
        state.isAddLoading = false;

      })
      .addCase(createContact.rejected, state => {
        state.isAddLoading = false;
      });
      // .addCase(deleteOneDish.pending, state => {
      //   state.isDeleteLoading = true;
      // })
      // .addCase(deleteOneDish.fulfilled, state => {
      //   state.isDeleteLoading = false;
      // })
      // .addCase(deleteOneDish.rejected, state => {
      //   state.isDeleteLoading = false;
      // })
      // .addCase(createDish.pending, state => {
      //   state.isCreateLoading = true;
      // })
      // .addCase(createDish.fulfilled, state => {
      //   state.isCreateLoading = false;
      // })
      // .addCase(createDish.rejected, state => {
      //   state.isCreateLoading = false;
      // })
      // .addCase(getOneDishById.pending, state => {
      //   state.isFetchLoading = true;
      //   state.oneDish = null;
      // })
      // .addCase(getOneDishById.fulfilled, (state,action:PayloadAction<ApiDish | null>) => {
      //   state.isFetchOneDishLoading = false;
      //   state.oneDish = action.payload;
      // })
      // .addCase(getOneDishById.rejected, (state) => {
      //   state.isFetchOneDishLoading = false;
      // })
      // .addCase(editDish.pending, state => {
      //   state.isFetchOneDishLoading = true;
      //
      // })
      // .addCase(editDish.fulfilled, (state) => {
      //   state.isEditLoading = false;
      //   state.oneDish = null;
      // })
      // .addCase(editDish.rejected, (state) => {
      //   state.isEditLoading = false;
      // });
  }
});

export const contactsReducer = contactsSlice.reducer;
export const {} = contactsSlice.actions;