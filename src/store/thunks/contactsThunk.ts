import { createAsyncThunk } from '@reduxjs/toolkit';
import { IForm } from '../../types';
import axiosApi from '../../axiosAPI.ts';

// export const fetchAllDishes = createAsyncThunk<IDish[], void>(
//   'dishes/fetchAllDishes',
//   async (_arg, thunkAPI) => {
//     const response: {data: DishesList | null} = await axiosApi('dishes.json');
//     const dishesList = response.data;
//
//     if (dishesList === null) {
//       return [];
//     }
//
//     const dishes: DishesList = dishesList;
//
//    const newDishes = Object.keys(dishesList).map(dish => {
//       return {
//         ...dishes[dish],
//         id: dish
//       };
//     });
//    thunkAPI.dispatch(updateCart(newDishes));
//    return newDishes;
//   }
// );
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
await  axiosApi.post('form.json',{...form});
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