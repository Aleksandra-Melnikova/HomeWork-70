import { createAsyncThunk } from '@reduxjs/toolkit';
import { IContact, IContactsList, IForm } from '../../types';
import axiosApi from '../../axiosAPI.ts';

export const fetchAllContacts = createAsyncThunk<IContact[], void>(
  'contacts/fetchAllContacts',
  async () => {
    const response: {data: IContactsList | null} = await axiosApi('contacts.json');
    const contactsList = response.data;

    if (contactsList === null) {
      return [];
    }

    const contacts: IContactsList = contactsList;

   const newContacts = Object.keys(contactsList).map(contact => {
      return {
        ...contacts[contact],
        id: contact
      };
    });
   console.log(newContacts);
   return newContacts ;
  }
);
//
// export const deleteOneDish = createAsyncThunk<void, string  >(
//   'dishes/deleteOneDish',
//   async (dishId:string)=>{
//       await axiosApi.delete(`dishes/${dishId}.json`);
//     }
//
// );

export const createContact = createAsyncThunk<void,IForm>('contacts/createContact',
  async (form)=>{
await  axiosApi.post('contacts.json',{...form});
});
//
// export const getOneDishById = createAsyncThunk<ApiDish | null, string>('dishes/getOnDishById',
//   async (dishId)=>{
// const response = await  axiosApi<ApiDish | null>(`dishes/${dishId}.json`);
// return response.data || null;
//   });
//  export const editDish = createAsyncThunk<void,{ dishId:string, dish:ApiDish}>(
//    'dishes/editDish',
//    async ({dishId,dish}) =>{
// await axiosApi.put(`dishes/${dishId}.json`,{...dish});
//    }
//  );