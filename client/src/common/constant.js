import {
  Dashboard as DashboardIcon,
  ViewList as ProductsIcon,
  Description as ProjectIcon,
  ContactMail as LeadsIcon,
  List as CategoryIcon,
  People as UserIcon,
  Storefront as ShowroomIcon,
  InsertComment as EnquiryIcon,
  ShoppingCart as OrdersIcon
} from '@material-ui/icons'

export const options = {
  pageSize: 10,
  pageSizeOptions: [10, 25, 50],
  filtering: true,
  actionsColumnIndex: -1,
  sorting: true
}

export const menu = [
  { text: 'Dashboard' },
  { icon: <DashboardIcon />, text: 'Homepaga & Featured', link: '/dashboard' },
  { divider: true, text: 'divider1' },
  { text: 'Content Management' },
  { icon: <ProductsIcon />, text: 'Manage Products', link: '/products' },
  { icon: <ProjectIcon />, text: 'Manage Projects', link: '/projects' },
  { icon: <ShowroomIcon />, text: 'Manage Showrooms', link: '/showrooms' },
  { divider: true, text: 'divider2' },
  { text: 'Customer Management' },
  { icon: <LeadsIcon />, text: 'Manage Leads', link: '/leads' },
  { icon: <EnquiryIcon />, text: 'Manage Enquiry', link: '/enquiries' },
  { icon: <OrdersIcon />, text: 'Manage Orders (Stripe)', link: 'https://dashboard.stripe.com/payments?status%5B%5D=successful', target: '_blank' },
  { divider: true, text: 'divider3', admin: true },
  { text: 'Settings Management', admin: true },
  { icon: <CategoryIcon />, text: 'Manage Categories', link: '/categories', admin: true },
  { icon: <UserIcon />, text: 'Manage Users', link: '/users', admin: true }
]