
import ButtonLoading from '../UI/ButtonLoading/ButtonLoading.tsx';
import { useState } from 'react';
import { IForm } from '../../types';
import { useNavigate } from 'react-router-dom';
import { createContact } from '../../store/thunks/contactsThunk.ts';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectAddLoading } from '../../store/slices/contactsSlice.ts';
import { toast } from 'react-toastify';


const Form = () => {
  const initialForm : IForm = {
    name:'',
    email:'',
    phone: '',
    photoUrl:''
  };
  const [form, setForm] = useState<IForm>(initialForm);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const createAddLoading = useAppSelector(selectAddLoading);
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

  const addNewContacts = async (e: React.FormEvent ,form:IForm) => {
    e.preventDefault();
    await dispatch(createContact({...form}));
    navigate('/');
    toast.success('Contact added successfully.');
  };

  return (
    <div className='container'>
      <form className='mx-auto w-75' onSubmit={(event)=>addNewContacts(event,form)}>
        <h3 className='my-4'>Add new contact</h3>
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

        <div className="d-flex"><ButtonLoading text={'Add'}
          isLoading={createAddLoading }
          isDisabled={createAddLoading }
        />
          <button onClick={()=> navigate('/')} className='btn btn-primary ms-4' type="button">Back to contacts</button></div>


        {/*<button type="submit" disabled={isLoading} className="btn btn-primary d-flex align-items-center">*/}
        {/*  <span className='me-2'>{isEdit ? 'Edit' : 'Add'}</span>*/}
        {/*  {isLoading?<ButtonSpinner/>:null}*/}
        {/*</button>*/}
      </form>
    </div>
  );
};

export default Form;