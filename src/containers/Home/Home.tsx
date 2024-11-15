import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectContacts } from '../../store/slices/contactsSlice.ts';
import { useCallback, useEffect } from 'react';
import { fetchAllContacts } from '../../store/thunks/contactsThunk.ts';
import ContactItem from '../../components/contactItem/contactItem.tsx';


const Home = () => {
  const contacts = useAppSelector(selectContacts);
  // const isFetchLoading = useAppSelector(selectFetchLoading);
  const dispatch = useAppDispatch();
  const fetchContacts = useCallback(async () => {
    await dispatch (fetchAllContacts());
  }, [dispatch]);
  useEffect(() => { {
      void fetchContacts();
    }
  }, [fetchContacts]);


  return (

    <>{contacts.length > 0 ? (<>
      {contacts.map(contact => (
        <ContactItem key={contact.id} name={contact.name} photoUrl={contact.photoUrl}  />
      ))}
    </>) : (<p className='d-block text-center mt-5'>
      No contacts, add a new contact</p>)}</>
  );
};

export default Home;