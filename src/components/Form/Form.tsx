
import ButtonLoading from '../UI/ButtonLoading/ButtonLoading.tsx';
import React, { useEffect, useState } from 'react';
import { IForm } from '../../types';
import { useNavigate, useParams } from 'react-router-dom';
import { createContact, editContact } from '../../store/thunks/contactsThunk.ts';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectAddLoading, selectContact } from '../../store/slices/contactsSlice.ts';
import { toast } from 'react-toastify';

export interface IFormProps {
  isEdit?: boolean;
  existingForm?: IForm;
}
const initialForm : IForm = {
  name:'',
  email:'',
  phone: '',
  photoUrl:''
};

const Form:React.FC<IFormProps> = ({isEdit = false, existingForm = initialForm}) => {
  const {id} = useParams();
  const [form, setForm] = useState<IForm>(existingForm);
  const navigate = useNavigate();
  const createAddLoading = useAppSelector(selectAddLoading);
  const dispatch = useAppDispatch();
  const contact = useAppSelector(selectContact);

  useEffect(() => {
    if(id){
      if(contact)
        setForm({...contact});
    }
    else{
      setForm({ ...existingForm});
    }
  }, [contact, existingForm, id]);


  // useEffect(() => {
  //   if(id){
  //      dispatch (getOneContactById(id));
  //   }
  //
  // }, [dispatch, id]);


//   useEffect(() => {
//     const getContactToEdit = async () => {
// if(id){
//   await dispatch (getOneContactById(id));
//   if(contact){
//     setForm({...contact});
//   }
//
// }
//
//       else {
//
//       }
// //     };
//     void getContactToEdit();
//   }, [contact, dispatch, existingForm, id]);


  const changeForm = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setForm((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  console.log(form);

  // const onSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (form.name.trim().length === 0 || form.phone.trim().length === 0) {
  //     alert("Full all fields!");
  //   } else {
  //     addNewContact({...form});
  //
  //     if (!isEdit) {
  //       setForm({...existingForm
  //       });
  //     }
  //   }
  // };

  const addNewContacts = async (e: React.FormEvent ,form:IForm) => {
    e.preventDefault();
    if(id){
      await dispatch(editContact({contactId: id, contact: {...form}}));
      navigate('/');
      toast.success('Contact was edited successfully.');
    }
    else{
      await dispatch(createContact({...form}));
      navigate('/');
      toast.success('Contact added successfully.');
    }


  };

  return (
    <div className='container'>
      <form className='mx-auto w-75' onSubmit={(e)=> addNewContacts(e,form)}>
        <h3 className='my-4'> {isEdit ? 'Edit'  : 'Add new'} dish</h3>
        <div className="d-flex  mb-2">
          <label className='me-4 col-2' htmlFor="name">Name</label>
          <input
            type="text"
            onChange={changeForm}
            value={form.name}
            id="name"
            name="name"
            className="form-control "
          />
        </div>

        <div className="d-flex mb-2">
          <label className='me-4 col-2' htmlFor="phone">Phone</label>
          <input
            type='text'
            value={form.phone}
            id="phone"
            name="phone"
            onChange={changeForm}
            className="form-control"
          />
        </div>
        <div className="d-flex mb-2">
          <label className='me-4 col-2' htmlFor="email">Email</label>
          <input
            value={form.email}
            type="text"
            id="email"
            name="email"
            onChange={changeForm}
            className="form-control"
          />
        </div>

        <div className="d-flex mb-2">
          <label className='me-4 col-2' htmlFor="photoUrl">Photo url</label>
          <input
            value={form.photoUrl}
            onChange={changeForm}
            type="text"
            id="photoUrl"
            name="photoUrl"
            className="form-control"
          />
        </div>
        <div className='d-flex align-items-start mt-4 mb-4'><span className='d-block me-4 col-2'>Photo preview</span>
          <div className=" photo border border-1 border-bg-light rounded-2">{form.photoUrl?<><img className={'w-100 h-auto'} src={form.photoUrl} alt={''}/></>:null}
          </div>
        </div>

        <div className="d-flex"><ButtonLoading text={'Save'}
          isLoading={createAddLoading }
          isDisabled={createAddLoading }
        />
          <button onClick={()=> navigate('/')} className='btn btn-primary ms-4' type="button">Back to contacts</button></div>

      </form>
    </div>
  );
};

export default Form;