import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { NavigationItem } from 'src/app/models/navigation';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit , AfterViewInit{
  navigation: NavigationItem = new NavigationItem();
  menu_items: any[] = [];

  constructor( 
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.menu_items = this.navigation.get();
  }

  ngAfterViewInit(): void {
    this.enqueueScripts();
  }

  onNavigate(link: string): void {
    this.router.navigateByUrl(link);
    window.scrollTo(0, 0);
  }

  enqueueScripts(): void {
    /*-------------------------------------
      Sidebar Toggle Menu
    -------------------------------------*/
    $('.sidebar-toggle-view').on(
      'click',
      '.sidebar-nav-item .nav-link',
      function (e) {
        if (!$(this).parents('#wrapper').hasClass('sidebar-collapsed')) {
          var animationSpeed = 300,
            subMenuSelector = '.sub-group-menu',
            $this = $(this),
            checkElement = $this.next();
          if (checkElement.is(subMenuSelector) && checkElement.is(':visible')) {
            checkElement.slideUp(animationSpeed, function () {
              checkElement.removeClass('menu-open');
            });
            checkElement.parent('.sidebar-nav-item').removeClass('active');
          } else if (
            checkElement.is(subMenuSelector) &&
            !checkElement.is(':visible')
          ) {
            var parent = $this.parents('ul').first();
            var ul = parent.find('ul:visible').slideUp(animationSpeed);
            ul.removeClass('menu-open');
            var parent_li = $this.parent('li');
            checkElement.slideDown(animationSpeed, function () {
              checkElement.addClass('menu-open');
              parent.find('.sidebar-nav-item.active').removeClass('active');
              parent_li.addClass('active');
            });
          }
          if (checkElement.is(subMenuSelector)) {
            e.preventDefault();
          }
        } else {
          if ($(this).attr('href') === '#') {
            e.preventDefault();
          }
        }
      }
    );

    /*-------------------------------------
      Sidebar Menu Control
    -------------------------------------*/
    $('.sidebar-toggle').on('click', function () {
      window.setTimeout(function () {
        $('#wrapper').toggleClass('sidebar-collapsed');
        $('#wrapper2').toggleClass('sidebar-collapsed');
      }, 300);
    });

    /*-------------------------------------
        Sidebar Menu Control Mobile
      -------------------------------------*/
    $('.sidebar-toggle-mobile').on('click', function () {
      $('#wrapper').toggleClass('sidebar-collapsed-mobile');
      if ($('#wrapper').hasClass('sidebar-collapsed')) {
        $('#wrapper').removeClass('sidebar-collapsed');
      }
    });
  }
}
