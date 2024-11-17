import { IContact, IForm } from '../../types';

import { createSlice, PayloadAction, } from '@reduxjs/toolkit';
import {
  createContact,
  deleteOneContact,
  editContact,
  fetchAllContacts,
  getOneContactById
} from '../thunks/contactsThunk.ts';
import { RootState } from '../../app/store.ts';

interface ContactState {
  isAddLoading: boolean;
  contacts:IContact[];
  isFetchLoading: boolean;
  isDeleteLoading: boolean;
  oneContact:IForm|null;
  isFetchOneContactLoading:boolean;
  isEditLoading: boolean;
}

const initialState:ContactState   = {
  isAddLoading: false,
  contacts:[],
  isFetchLoading:true,
  oneContact:null,
  isFetchOneContactLoading: false,
  isDeleteLoading: false,
  isEditLoading: false
};
export const selectAddLoading = (state: RootState) => state.contacts.isAddLoading;
export const selectFetchLoading = (state: RootState) => state.contacts.isFetchLoading;
export const selectContacts = (state: RootState) => state.contacts.contacts;
export const selectDeleteLoading = (state: RootState) => state.contacts.isDeleteLoading;
export const selectEditLoading = (state: RootState) => state.contacts.isEditLoading;
export const selectFetchOneContactLoading = (state: RootState) => state.contacts.isFetchOneContactLoading;
export const selectContact = (state: RootState) => state.contacts.oneContact;


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
      })
      .addCase(getOneContactById.pending, state => {
        state.isFetchOneContactLoading = true;
        state.oneContact = null;
      })
      .addCase(getOneContactById.fulfilled, (state,action:PayloadAction<IForm | null>) => {
        state.isFetchOneContactLoading= false;
        state.oneContact = action.payload;
      })
      .addCase(getOneContactById.rejected, (state) => {
        state.isFetchOneContactLoading = false;
      })
      .addCase(editContact.pending, state => {
        state.isEditLoading = true;

      })
      .addCase(editContact.fulfilled, (state) => {
        state.isEditLoading = false;
        state.oneContact = null;
      })
      .addCase(editContact.rejected, (state) => {
        state.isEditLoading = false;
      });
  }
});

export const contactsReducer = contactsSlice.reducer;
export const {} = contactsSlice.actions;