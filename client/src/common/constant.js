import React from 'react'
import {
  Build as RepairIcon,
  Dashboard as DashboardIcon,
  Apartment as SupplierIcon,
  People as UserIcon
} from '@material-ui/icons'

export const options = {
  pageSize: 10,
  pageSizeOptions: [10, 25, 50],
  filtering: true,
  actionsColumnIndex: -1,
  sorting: true
}

export const menu = [
  { icon: <DashboardIcon />, text: 'Dashboard', link: '/dashboard' },
  { divider: true, text: 'divider1' },
  { text: 'Services' },
  { icon: <RepairIcon />, text: 'Refurbishment', link: '/refurbishment' },
  { divider: true, text: 'divider2' },
  { text: 'Contacts' },
  { icon: <SupplierIcon />, text: 'Suppliers', link: '/supplier' },
  { divider: true, text: 'divider3', admin: true },
  { text: 'Management', admin: true },
  { icon: <UserIcon />, text: 'Users', link: '/users', admin: true }
]