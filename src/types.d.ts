export interface IForm {
  name: string;
  phone: string;
  email: string;
  photoUrl: string;
}
export interface IContact {
  name: string;
  phone: string;
  email: string;
  photoUrl: string;
  id: string;
}

export interface IContactsList {
  [id: string]: IForm;
}
