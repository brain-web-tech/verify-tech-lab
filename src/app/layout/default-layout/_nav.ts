import { INavData } from '@coreui/angular';

export let navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },{
    name: 'Material Management',
    url: '/buttons',
    icon: 'fa fa-address-card',
    roles: ['Admin'],
    class: 'd-block',
    children: [
      {
        name: 'Buttons',
        url: '/buttons/buttons',
        icon: 'nav-icon-bullet',
        roles: ['Admin'],
        class: 'd-block',
      },
      {
        name: 'Button groups',
        url: '/buttons/button-groups',
        icon: 'nav-icon-bullet',
        roles: ['Admin'],
        class: 'd-block',
      },
      {
        name: 'Dropdowns',
        url: '/buttons/dropdowns',
        icon: 'nav-icon-bullet',
        roles: ['Admin'],
        class: 'd-block',
      }
    ]
  },
  {
    name: 'Blank Material Management',
    url: '/forms',
    icon: 'fa fa-address-book',
    roles: ['Admin'],
    children: [
      {
        name: 'Form Control',
        url: '/forms/form-control',
        icon: 'nav-icon-bullet',
        class: 'd-block',
        roles: ['Admin']
      },
      {
        name: 'Select',
        url: '/forms/select',
        icon: 'nav-icon-bullet',
        class: 'd-block',
        roles: ['Admin']
      },
      {
        name: 'Checks & Radios',
        url: '/forms/checks-radios',
        icon: 'nav-icon-bullet',
        class: 'd-block',
        roles: ['Admin']
      },
      {
        name: 'Range',
        url: '/forms/range',
        icon: 'nav-icon-bullet',
        class: 'd-block',
        roles: ['Admin']
      },
      {
        name: 'Input Group',
        url: '/forms/input-group',
        icon: 'nav-icon-bullet',
        class: 'd-block',
        roles: ['Admin']
      },
      {
        name: 'Floating Labels',
        url: '/forms/floating-labels',
        icon: 'nav-icon-bullet',
        class: 'd-block',
        roles: ['Admin']
      },
      {
        name: 'Layout',
        url: '/forms/layout',
        icon: 'nav-icon-bullet',
        class: 'd-block',
        roles: ['Admin']
      },
      {
        name: 'Validation',
        url: '/forms/validation',
        icon: 'nav-icon-bullet',
        class: 'd-block',
        roles: ['Admin']
      }
    ]
  },
  {
    name: 'Assignment',
    icon: 'fa fa-bars',
    url: '/icons',
    class: 'd-block',
    roles: ['Admin'],
    children: [
      {
        name: 'CoreUI Free',
        url: '/icons/coreui-icons',
        icon: 'nav-icon-bullet',
        badge: {
          color: 'success',
          text: 'FREE'
        },
        class: 'd-block',
        roles: ['Admin']
      },
      {
        name: 'CoreUI Flags',
        url: '/icons/flags',
        icon: 'nav-icon-bullet',
        class: 'd-block',
        roles: ['Admin']
      },
      {
        name: 'CoreUI Brands',
        url: '/icons/brands',
        icon: 'nav-icon-bullet',
        class: 'd-block',
        roles: ['Admin']
      }
    ]
  },{
    name: 'Tasks',
    url: '/base/popovers',
    icon: 'fa fa-tasks',
    class: 'd-block',
    roles: ['Admin']
  },{
    name: 'Maintanance & Calibration',
    url: '/base/breadcrumbs',
    icon: 'fa fa-briefcase',
    class: 'd-block',
    roles: ['Admin']
  },
  {
    name: 'Reports',
    url: '/base/spinners',
    icon: 'fa fa-file-text',
    class: 'd-block',
    roles: ['Admin']
  },
  {
    name: 'Admin',
    title: true
  },
  {
    name: 'Tool Customization',
    url: '/base',
    icon: 'fa fa-cog',
    children: [
      {
        name: 'Employee Master',
        url: '/base/emp-master',
        icon: 'nav-icon-bullet',
        class: 'd-block',
        roles: ['Admin']
      },
      {
        name: 'Breadcrumbs',
        url: '/base/breadcrumbs',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Cards',
        url: '/base/cards',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Carousel',
        url: '/base/carousel',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Collapse',
        url: '/base/collapse',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'List Group',
        url: '/base/list-group',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Navs & Tabs',
        url: '/base/navs',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Pagination',
        url: '/base/pagination',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Placeholder',
        url: '/base/placeholder',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Popovers',
        url: '/base/popovers',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Progress',
        url: '/base/progress',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Spinners',
        url: '/base/spinners',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Tables',
        url: '/base/tables',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Tabs',
        url: '/base/tabs',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Tooltips',
        url: '/base/tooltips',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  {
    name: 'Charts',
    iconComponent: { name: 'cil-chart-pie' },
    url: '/charts'
  },
  {
    name: 'Notifications',
    url: '/notifications',
    iconComponent: { name: 'cil-bell' },
    children: [
      {
        name: 'Alerts',
        url: '/notifications/alerts',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Badges',
        url: '/notifications/badges',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Modal',
        url: '/notifications/modal',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Toast',
        url: '/notifications/toasts',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  {
    name: 'Widgets',
    url: '/widgets',
    iconComponent: { name: 'cil-calculator' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Extras'
  },
  {
    name: 'Pages',
    url: '/login',
    iconComponent: { name: 'cil-star' },
    children: [
      {
        name: 'Login',
        url: '/login',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Register',
        url: '/register',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Error 404',
        url: '/404',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Error 500',
        url: '/500',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  {
    title: true,
    name: 'Links',
    class: 'mt-auto'
  },
  {
    name: 'Docs',
    url: 'https://coreui.io/angular/docs/5.x/',
    iconComponent: { name: 'cil-description' },
    attributes: { target: '_blank' }
  }
];
