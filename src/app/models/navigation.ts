import { Injectable } from '@angular/core';

export interface NavigationItem {
    id: string;
    title: string;
    type: 'item' | 'collapse' | 'group';
    translate?: string;
    icon?: string;
    hidden?: boolean;
    url?: string;
    classes?: string;
    exactMatch?: boolean;
    external?: boolean;
    target?: boolean;
    breadcrumbs?: boolean;
    function?: any;
    badge?: {
      title?: string;
      type?: string;
    };
    children?: Navigation[];
  }

  export interface Navigation extends NavigationItem {
    children?: NavigationItem[];
  }

  const NavigationItems = [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        icon: 'fa fa-desktop',
        url: '/dashboard',

      },
      {
        id: 'trading-live',
        title: 'Trading Live',
        type: 'item',
        icon: 'fa fa-bar-chart',
        url: '/trading-live',
      },
      {
        id: 'portfolio',
        title: 'Portfolio',
        type: 'item',
        icon: 'fa fa-folder-open',
        url: '/portfolio',
      },
      {
        id: 'reporting',
        title: 'Reporting',
        type: 'item',
        icon: 'fa fa-copy',
        url: '/reporting',
      },
      {
        id: 'account',
        title: 'Account',
        type: 'item',
        icon: 'fa fa-money',
        url: '/account',
      },
  ];

  const RegulatorNavigationItems = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      icon: 'fa fa-desktop',
      url: 'regulator/dashboard',

    },
    // {
    //   id: 'reporting',
    //   title: 'Reporting',
    //   type: 'item',
    //   icon: 'fa fa-copy',
    //   url: '/reporting',
    // },
];
const AdminNavigationItems = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'item',
    icon: 'fa fa-desktop',
    url: 'admin/dashboard',

  },
  // {
  //   id: 'reporting',
  //   title: 'Reporting',
  //   type: 'item',
  //   icon: 'fa fa-copy',
  //   url: '/reporting',
  // },
];

  @Injectable()
    export class NavigationItem {
    public get() {
      if( localStorage.getItem('role')== 'client'){
        return NavigationItems
      }
      else if( localStorage.getItem('role')== 'regulator') {
        return RegulatorNavigationItems
      }
      else{
        return AdminNavigationItems
      }
    }
}