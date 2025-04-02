import { IUser } from "./types";
import {
  SlUserFollowing,
  SlUser,
  SlUserFollow,
  SlUserUnfollow,
} from "react-icons/sl";

export const items: IUser[] = [
  {
    id: 1,
    status: "approved",
    first_name: "Laptop",
    last_name: "Laptop",
    email: "Electronics",
  },
  {
    id: 2,
    status: "deleted",
    first_name: "Coffee Maker",
    last_name: "Coffee Maker",
    email: "Home Appliances",
  },
  {
    id: 3,
    status: "approved",
    first_name: "Desk Chair",
    last_name: "Desk Chair",
    email: "Furniture",
  },
  {
    id: 4,
    status: "pending",
    first_name: "Smartphone",
    last_name: "Smartphone",
    email: "Electronics",
  },
  {
    id: 5,
    status: "approved",
    first_name: "Headphones",
    last_name: "Headphones",
    email: "Accessories",
  },
];

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
