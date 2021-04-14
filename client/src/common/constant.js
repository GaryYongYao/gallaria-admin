import {
  FormatListBulleted as FormatListBulletedIcon,
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
  { text: 'Functions' },
  { icon: <FormatListBulletedIcon />, text: 'Products', link: '/products' },
  { divider: true, text: 'divider3', admin: true },
  { text: 'Management', admin: true },
  { icon: <UserIcon />, text: 'Users', link: '/users', admin: true }
]