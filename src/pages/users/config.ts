import { IUser } from "./types";
import {
  SlUserFollowing,
  SlUser,
  SlUserFollow,
  SlUserUnfollow,
} from "react-icons/sl";

export const tabs = [
  {
    key: 'all',
    text: 'All users',
    icon: SlUser,
  }, 
  {
    key: 'approved',
    text: 'Approved',
    icon: SlUserFollowing
  },
  {
    key: 'pending',
    text: 'Pending approval',
    icon: SlUserFollow
  },
  {
    key: 'deleted',
    text: 'Deleted',
    icon: SlUserUnfollow
  }
]
