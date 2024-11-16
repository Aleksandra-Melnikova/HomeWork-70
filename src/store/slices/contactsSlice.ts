import { IContact } from '../../types';

import { createSlice, PayloadAction, } from '@reduxjs/toolkit';
import { createContact, deleteOneContact, fetchAllContacts } from '../thunks/contactsThunk.ts';
import { RootState } from '../../app/store.ts';

interface ContactState {
  isAddLoading: boolean;
  contacts:IContact[];
  isFetchLoading: boolean;
  isDeleteLoading: boolean;
}

const initialState:ContactState   = {
  isAddLoading: false,
  contacts:[],
  isFetchLoading:true,
  // oneDish:null,

  // isFetchOneDishLoading: false,
  isDeleteLoading: false,
  // isCreateLoading: false,
  // isEditLoading: false
};
export const selectAddLoading = (state: RootState) => state.contacts.isAddLoading;
//
export const selectFetchLoading = (state: RootState) => state.contacts.isFetchLoading;
export const selectContacts = (state: RootState) => state.contacts.contacts;
export const selectDeleteLoading = (state: RootState) => state.contacts.isDeleteLoading;

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
      })

    .addCase(fetchAllContacts.pending, state => {
        state.isFetchLoading = true;
      })
        .addCase(fetchAllContacts.fulfilled, (state,action:PayloadAction<IContact[]>) => {
          state.isFetchLoading = false;
          state.contacts = action.payload;
        })
        .addCase(fetchAllContacts.rejected, state => {
          state.isFetchLoading = false;
        })
      .addCase(deleteOneContact.pending, state => {
        state.isDeleteLoading = true;
      })
      .addCase(deleteOneContact.fulfilled, state => {
        state.isDeleteLoading = false;
      })
      .addCase(deleteOneContact.rejected, state => {
        state.isDeleteLoading = false;
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