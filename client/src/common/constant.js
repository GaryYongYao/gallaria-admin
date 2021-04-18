import {
  ViewList as ProductsIcon,
  List as CategoryIcon,
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
  { icon: <ProductsIcon />, text: 'Manage Products', link: '/products' },
  { divider: true, text: 'divider3', admin: true },
  { text: 'Management', admin: true },
  { icon: <CategoryIcon />, text: 'Manage Categories', link: '/categories', admin: true },
  { icon: <UserIcon />, text: 'Manage Users', link: '/users', admin: true }
]