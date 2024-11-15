import React from 'react';
export interface ContactItemProps {
  photoUrl: string;
  name: string;
}

const ContactItem: React.FC<ContactItemProps> = ({photoUrl,name}) => {
  return (
    <div className={'border border-1 border-dark-subtle p-1 rounded-2 row justify-content-between align-items-center contact-item mb-2'}>
      <img className={'col-5 photo-img'} src={photoUrl} alt={name}/>
      <div className={'col-5 ms-5 fs-2'}>{name}</div>
      </div>
  );
};

export default ContactItem;