import React, { useState } from 'react';
import Modal from '../UI/Modal/Modal.tsx';
import { useNavigate } from 'react-router-dom';
import { IContact} from '../../types';
import { Envelope, Telephone } from 'react-bootstrap-icons';
import { toast } from 'react-toastify';
import ButtonLoading from '../UI/ButtonLoading/ButtonLoading.tsx';
import { useAppSelector } from '../../app/hooks.ts';
import { selectDeleteLoading } from '../../store/slices/contactsSlice.ts';

export interface IContactProps extends IContact {
  onDelete: (id:string) => void;
}


const ContactItem: React.FC<IContactProps> = ({id, photoUrl,name, phone,email, onDelete}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const isDeleteLoading = useAppSelector(selectDeleteLoading);
  const navigate = useNavigate();
  const deleteContact = async (id:string)=>{
    await onDelete(id);
    toast.success(`Contact was deleted successfully.`);
    setShowModal(false);
    navigate(`/`);
  };



  return (
    <>
    <Modal show={showModal} closeModal={() => setShowModal(false)} title="Contact">
      <div className="modal-body row align-items-center">
        <div className="col-4">
          <img className={'w-100'} src={photoUrl} alt=""/>
        </div>
        <div className={'col-5'}>
        <h2>{name}</h2>
          <div className={'d-flex align-items-center'}><Telephone />
            <a className={'text-primary d-block ms-2 mb-2'}>{phone}</a></div>
          <div  className={'d-flex align-items-center'}> <Envelope/>
            <a className={'text-primary d-block ms-2'}> {email}</a></div>
        </div>
      </div>
      <div className="modal-footer">
    <button type={'button'} className="btn btn-success me-3" onClick={() => navigate('/edit')}>Edit</button>
        <ButtonLoading isDisabled={isDeleteLoading} text={'delete'} isLoading={isDeleteLoading} type={'button'} onClick={()=>deleteContact(id)}/>
      </div>
    </Modal>
      <div
        onClick={()=> setShowModal(true)}
        className={'border border-1 border-dark-subtle p-1 rounded-2 row justify-content-between align-items-center contact-item mb-2'}>
      <img className={'col-5 photo-img'} src={photoUrl} alt={name}/>
      <div className={'col-5 ms-5 fs-2'}>{name}</div>
      </div>
    </>
  );
};

export default ContactItem;