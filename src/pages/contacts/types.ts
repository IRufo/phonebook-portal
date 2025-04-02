import { Dispatch, SetStateAction } from "react";

export interface IErrorContact {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone_number?: string;
}
  
export type TContact = 'first_name' | 'last_name' | 'email' | 'phone_number'

export interface IContact {
    id: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    status: string;
    owner_id: string
  };
  

export interface ITableRow {
    item: IContact
    selection: string[]
    activeTab: string
    setSelection:Dispatch<SetStateAction<string[]>>
    setSelectedContact: (prev: IContact) => void
    setShowEditPopup: (shw:boolean) => void
    setShowDeletePopup: (shw:boolean) => void
    setShowUnsharePopup: (shw:boolean) => void
    setShowSharePopup: (shw:boolean) => void
    
}