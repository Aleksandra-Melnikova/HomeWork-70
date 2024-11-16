

import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';

import Form from '../../components/Form/Form.tsx';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';
import { selectContact, selectFetchOneContactLoading } from '../../store/slices/contactsSlice.ts';

import {  useParams } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { getOneContactById } from '../../store/thunks/contactsThunk.ts';



const EditContact = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const contact = useAppSelector(selectContact);
  // const navigate = useNavigate();
  console.log(contact);
  const getDishById = useCallback(async () => {
    if( id){
      dispatch(getOneContactById(id));
    }

  }, [dispatch, id]);

  useEffect(() => {
    void getDishById();
  }, [getDishById]);

  // const edit = async (contact: IForm) => {
  //
  //   if(id){
  //     await dispatch(editContact({contactId:id, contact}));
  //     navigate('/');
  //     toast.success('Dish was edited successfully.');
  //   }
  // };
  const fetchLoading = useAppSelector(selectFetchOneContactLoading);
  return (
    <>
      {fetchLoading?<Spinner/>:<> {contact?<Form  isEdit />:null}</>
      }
      </>

  );
};

export default EditContact;