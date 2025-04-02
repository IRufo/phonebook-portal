import { Dispatch, SetStateAction } from "react"

export interface IUser {
  id: string,
  first_name: string,
  last_name: string,
  email: string,
  status: string
}


export interface ITableRow {
    item: IUser
    selection: string[]
    activeTab: string
    setSelection:Dispatch<SetStateAction<string[]>>
    setSelectedUser: (prev: IUser) => void
    setShowEditPopup: (shw:boolean) => void
    setShowDeletePopup: (shw:boolean) => void
    setShowRestorePopup: (shw:boolean) => void
    setShowApprovePopup: (shw:boolean) => void
}