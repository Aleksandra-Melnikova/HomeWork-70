import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectContacts, selectFetchLoading } from '../../store/slices/contactsSlice.ts';
import { useCallback, useEffect } from 'react';
import { deleteOneContact, fetchAllContacts } from '../../store/thunks/contactsThunk.ts';
import ContactItem from '../../components/contactItem/contactItem.tsx';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';


const Home = () => {
  const contacts = useAppSelector(selectContacts);
  const isFetchLoading = useAppSelector(selectFetchLoading);
  const dispatch = useAppDispatch();
  const fetchContacts = useCallback(async () => {
    await dispatch (fetchAllContacts());
  }, [dispatch]);
  useEffect(() => { {
      void fetchContacts();
    }
  }, [fetchContacts]);

  const deleteContact = async (id:string)=>{
    await dispatch( deleteOneContact(id));
     await fetchContacts();
  };
  return (

    <>{contacts.length > 0 ? (<>{isFetchLoading?<Spinner/>:<> {contacts.map(contact => (
      <ContactItem key={contact.id} id={contact.id} name={contact.name} photoUrl={contact.photoUrl} email={contact.email} phone={contact.phone} onDelete={()=>deleteContact(contact.id)}  />
    ))}</>}
    </>) : (<p className='d-block text-center mt-5'>
      No contacts, add a new contact</p>)}</>
  );
};

export default Home;