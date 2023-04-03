import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { EventService } from 'src/app/core/service/event.service';
import { AuthenticationService } from '../../../core/service/auth.service';
import { MENU_ITEMS } from '../config/menu-meta';
import { MenuItem } from '../models/menu.model';
import { findAllParent, findMenuItem } from '../helper/utils';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent implements OnInit, AfterViewInit {

  @Input() navClasses: string | undefined;
  @Input() includeUserProfile: boolean = false;
  isInitialized: boolean = false;

  leftSidebarClass = 'sidebar-enable';
  activeMenuItems: string[] = [];

  loggedInUser: any ;
  loggedInUserData: any ;


  menuItems: MenuItem[] = [];

  constructor (
    router: Router,
    private authService: AuthenticationService,
    private eventService: EventService) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this._activateMenu(); //actiavtes menu
        this.hideMenu(); //hides leftbar on change of route
      }
    });


  }

  ngOnInit(): void {
    this.initMenu();
    this.loggedInUser = sessionStorage.getItem('currentUserName');
    console.log('sessionStorage.getItem(\'currentUserName\') :', sessionStorage.getItem('currentUserName'));
    this.loggedInUserData = sessionStorage.getItem('currentUser');
    this.loggedInUserData = JSON.parse(this.loggedInUserData);
    
    // this.loggedInUser = this.authService.currentUser();

  }

  ngOnChanges(): void {
    if (this.includeUserProfile) {
      document.body.setAttribute("data-sidebar-showuser", "true");
    }
    else {
      document.body.removeAttribute("data-sidebar-showuser");
    }
  }

  /**
   * On view init - activating menuitems
   */
  ngAfterViewInit() {
    setTimeout(() => {
      this._activateMenu();
    });
  }

  /**
   * initialize menuitems
   */
  initMenu(): void {
    let type:any = sessionStorage.getItem('currentUserName');
   type = JSON.parse(type)
    if(type.type == 'admin'){
      this.menuItems =  [
        {
            key: 'apps-students',
            label: 'Students',
            isTitle: false,
            icon: 'user',
            link: '/dashboard/students-info',
        }
        ,{
            key: 'apps-member-of-staff',
            label: 'Member Of Staff',
            isTitle: false,
            icon: 'users',
            link: '/dashboard/staffs-info',
        },
        {
            key: 'apps-result',
            label: 'Results',
            isTitle: false,
            icon: 'plus',
            collapsed: true,
            children: [
                        {
                            key: 'apps-create-result',
                            label: '  Create/Show Result',
                            link: '/dashboard/create-result',
                            icon: 'book',
                            parentKey: 'apps-result',
                        },
                        {
                          key: 'apps-class-performance',
                          label: '  Classwise Performance',
                          link: '/dashboard/class-performance',
                          icon: 'book',
                          parentKey: 'apps-result',
                      },                
                    ]
        },
        {
          key: 'apps-student-attendance',
          label: 'Attendance',
          isTitle: false,
          icon: 'book',
          link: '/dashboard',
          children: [
            {
                key: 'apps-view-attendance',
                label: '  View Attendance',
                link: '/dashboard/view-student-attendance',
                parentKey: 'apps-student-attendance',
            },
            {
                key: 'apps-mark-attendance',
                label: '  Mark Attendance',
                link: '/dashboard/mark-student-attendance',
                parentKey: 'apps-student-attendance',
            }
        ]
  }
  ,{
    key: 'apps-class-fee-structure',
    label: 'Fee Structure',
    isTitle: false,
    icon: 'book',
    link: '/dashboard/class-fee-structure',
},

  
        {
                key: 'apps-other',
                label: 'Others',
                isTitle: false,
                icon: 'plus',
                collapsed: true,
                children: [
                    {
                        key: 'apps-managements',
                        label: '  Management',
                        parentKey: 'apps-other',
                        collapsed: true,
                        icon: 'briefcase',
                        children: [
                            {
                                key: 'apps-terms',
                                label: 'Terms',
                                link: '/dashboard/terms',
                                parentKey: 'apps-managements',
                                
                            },
                            {
                                key: 'apps-class',
                                label: 'Class',
                                link: '/dashboard/classes',
                                parentKey: 'apps-managements',
                            
                            },
                            {
                                key: 'apps-subject',
                                label: 'Subject',
                                link: '/dashboard/subjects',
                                parentKey: 'apps-managements',
                            },
                        ],
                    },
                ],
        }
        ,{
          key: 'apps-notice',
          label: 'Notice',
          isTitle: false,
          icon: 'book',
          link: '/dashboard/notice',
      }
        ,
          {
            key: 'apps-finance',
            label: 'Finance',
            isTitle: false,
            icon: 'plus',
            collapsed: true,
            children: [
              {
                                  key: 'apps-fee-structure',
                                  label: 'Student Fee Payment',
                                  icon: 'book',
                                  link: '/dashboard/student-fee-payment',
                                  parentKey: 'apps-finance',
                          },
                                {
                                  key: 'apps-pay-out',
                                  label: 'Pay Out',
                                  icon: 'book',
                                  link: '/dashboard/pay-out',
                                  parentKey: 'apps-finance',
                          }
                    ]
        },  
        {
          key: 'apps-prediction',
          label: 'Result Prediction',
          isTitle: false,
          icon: 'book',
          link: '/dashboard/prediction',
      } 
    ];
    }else if(type.type == 'staff'){
      this.menuItems =  [
        {
            key: 'apps-students',
            label: 'Students',
            isTitle: false,
            icon: 'user',
            link: '/dashboard/students-info',
        },
        {
            key: 'apps-result',
            label: 'Results',
            isTitle: false,
            icon: 'plus',
            collapsed: true,
            children: [
                        {
                            key: 'apps-create-result',
                            label: '  Create/Show Result',
                            link: '/dashboard/create-result',
                            icon: 'book',
                            parentKey: 'apps-result',
                        },
                        {
                          key: 'apps-class-performance',
                          label: '  Classwise Performance',
                          link: '/dashboard/class-performance',
                          icon: 'book',
                          parentKey: 'apps-result',
                      },
                    ]
        },
        {
          key: 'apps-student-attendance',
          label: 'Attendance',
          isTitle: false,
          icon: 'book',
          link: '/dashboard',
          children: [
            {
                key: 'apps-view-attendance',
                label: '  View Attendance',
                link: '/dashboard/view-student-attendance',
                parentKey: 'apps-student-attendance',
            },
            {
                key: 'apps-mark-attendance',
                label: '  Mark Attendance',
                link: '/dashboard/mark-student-attendance',
                parentKey: 'apps-student-attendance',
            }
        ]
  },
  {
    key: 'apps-study-material',
    label: 'Study Material',
    isTitle: false,
    icon: 'book',
    link: '/dashboard/study-material',
},
        {
                key: 'apps-staff-attendance',
                label: 'Staff Attendance',
                isTitle: false,
                icon: 'book',
                link: '/dashboard/staff-attendance',
        },
        {
                key: 'apps-other',
                label: 'Others',
                isTitle: false,
                icon: 'plus',
                collapsed: true,
                children: [
                    {
                        key: 'apps-managements',
                        label: '  Management',
                        parentKey: 'apps-other',
                        collapsed: true,
                        icon: 'briefcase',
                        children: [
                            {
                                key: 'apps-terms',
                                label: 'Terms',
                                link: '/dashboard/terms',
                                parentKey: 'apps-managements',
                                
                            },
                            {
                                key: 'apps-class',
                                label: 'Class',
                                link: '/dashboard/classes',
                                parentKey: 'apps-managements',
                            
                            },
                            {
                                key: 'apps-subject',
                                label: 'Subject',
                                link: '/dashboard/subjects',
                                parentKey: 'apps-managements',
                            },
                        ],
                    },
                ],
        },
        {
          key: 'apps-notice',
          label: 'Notice',
          isTitle: false,
          icon: 'book',
          link: '/dashboard/notice',
      },
        {
          key: 'apps-prediction',
          label: 'Result Prediction',
          isTitle: false,
          icon: 'book',
          link: '/dashboard/prediction',
      }        ,
    ];
    }else{
      this.menuItems =  [
        {
            key: 'apps-result',
            label: 'Results',
            isTitle: false,
            icon: 'plus',
            collapsed: true,
            children: [
                        {
                            key: 'apps-create-result',
                            label: '  Show Result',
                            link: '/dashboard/create-result',
                            icon: 'book',
                            parentKey: 'apps-result',
                        },
                    ]
        },
        {
                key: 'apps-student-attendance',
                label: 'Attendance',
                isTitle: false,
                icon: 'book',
                link: '/dashboard',
                children: [
                  {
                      key: 'apps-view-attendance',
                      label: '  View Attendance',
                      link: '/dashboard/view-student-attendance',
                      parentKey: 'apps-student-attendance',
                  },
              ]
        },
        {
          key: 'apps-notice',
          label: 'Notice',
          isTitle: false,
          icon: 'book',
          link: '/dashboard/notice',
      }
    ];
    }
  }

  /**
   * activates menu
   */
  _activateMenu(): void {
    const div = document.getElementById('side-menu');
    let matchingMenuItem = null;

    if (div) {
      let items: any = div.getElementsByClassName('side-nav-link-ref');
      for (let i = 0; i < items.length; ++i) {
        if (window.location.pathname === items[i].pathname) {
          matchingMenuItem = items[i];
          break;
        }
      }

      if (matchingMenuItem) {
        const mid = matchingMenuItem.getAttribute('data-menu-key');
        const activeMt = findMenuItem(this.menuItems, mid);
        if (activeMt) {

          const matchingObjs = [activeMt['key'], ...findAllParent(this.menuItems, activeMt)];

          this.activeMenuItems = matchingObjs;

          this.menuItems.forEach((menu: MenuItem) => {
            menu.collapsed = !matchingObjs.includes(menu.key!);
          });
        }
      }
    }
  }

  /**
   * toggles open menu
   * @param menuItem clicked menuitem
   * @param collapse collpase instance
   */
  toggleMenuItem(menuItem: MenuItem, collapse: NgbCollapse): void {
    collapse.toggle();
    let openMenuItems: string[];
    if (!menuItem.collapsed) {
      openMenuItems = ([menuItem['key'], ...findAllParent(this.menuItems, menuItem)]);
      this.menuItems.forEach((menu: MenuItem) => {
        if (!openMenuItems.includes(menu.key!)) {
          menu.collapsed = true;
        }
      })
    }

  }


  /**
   * Returns true or false if given menu item has child or not
   * @param item menuItem
   */
  hasSubmenu(menu: MenuItem): boolean {
    return menu.children ? true : false;
  }


  /**
   * Hides the menubar
   */
  hideMenu() {
    document.body.classList.remove('sidebar-enable');
  }

}
