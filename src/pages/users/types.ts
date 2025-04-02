import { Dispatch, SetStateAction } from "react"

export interface IUser {
  id: number,
  first_name: string,
  last_name: string,
  email: string,
  status: string
}


export interface ITableRow {
    item: IUser
    selection: number[]
    activeTab: string
    setSelection:Dispatch<SetStateAction<number[]>>
    setSelectedUser: (prev: IUser) => void
    setShowEditPopup: (shw:boolean) => void
    setShowDeletePopup: (shw:boolean) => void
    setShowRestorePopup: (shw:boolean) => void
}