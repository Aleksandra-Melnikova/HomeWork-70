import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";

import Form from "../../components/Form/Form.tsx";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import {
  selectContact,
  selectEditLoading,
  selectFetchOneContactLoading,
} from "../../store/slices/contactsSlice.ts";

import { useParams } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { getOneContactById } from "../../store/thunks/contactsThunk.ts";

const EditContact = () => {
  const { id } = useParams();
  const editLoading = useAppSelector(selectEditLoading);
  const dispatch = useAppDispatch();
  const contact = useAppSelector(selectContact);

  const getDishById = useCallback(async () => {
    if (id) {
      dispatch(getOneContactById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    void getDishById();
  }, [getDishById]);

  const fetchLoading = useAppSelector(selectFetchOneContactLoading);
  return (
    <>
      {fetchLoading || editLoading ? (
        <Spinner />
      ) : (
        <> {contact ? <Form isEdit /> : null}</>
      )}
    </>
  );
};

export default EditContact;
