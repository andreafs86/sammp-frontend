import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss']
})
export class HeaderNavComponent implements OnInit {

  public showMenu:     boolean = false;
  public readonly menu:any[] = [
    {
      'label': 'Opção 1',
      'childs':{
        'category' :{
          'label':'Categoria 1',
          'childs':[
            {
              'label':'Opção 1.1',
              'route':'/select',
            },
            {
              'label':'Opção 1.2',
              'route':'/select',
            },
            {
              'label':'Opção 1.3',
              'route':'/select',
            },
            {
              'label':'Opção 1.4',
              'route':'/select',
            },
            {
              'label':'Opção 1.5',
              'childs':[
                {
                  'label':'Opção 1.5.1',
                  'route':'/select',
                },
                {
                  'label':'Opção 1.5.2',
                  'route':'/select',
                },
              ]
            },
          ]
        },
        'category-2' :{
          'label':'Categoria 2',
          'childs':[
            {
              'label':'Opção 2.1',
              'route':'/select',
            },
            {
              'label':'Opção 2.2',
              'route':'/select',
            },
            {
              'label':'Opção 2.3',
              'route':'/select',
            },
            {
              'label':'Opção 2.4',
              'route':'/select',
            },
            {
              'label':'Opção 2.5',
              'childs':[
                {
                  'label':'Opção 2.5.1',
                  'route':'/select',
                },
                {
                  'label':'Opção 2.5.2',
                  'route':'/select',
                },
              ]
            },
          ]
        },
        'without-category' :{
          'childs':[
            {
              'label':'Opção 1.1',
              'route':'/select',
            },
            {
              'label':'Opção 1.2',
              'route':'/select',
            },
            {
              'label':'Opção 1.3',
              'route':'/select',
            },
            {
              'label':'Opção 1.4',
              'route':'/select',
            },
            {
              'label':'Opção 1.5',
              'childs':[
                {
                  'label':'Opção 1.5.1',
                  'route':'/select',
                },
                {
                  'label':'Opção 1.5.2',
                  'route':'/select',
                },
              ]
            },
          ]
        }
      }
    },
    {
      'label': 'Opção 2',
      'route': '/button',
    },
    {
      'label': 'Opção 3',
      'childs':{
        'category' :{
          'label':'Categoria 3.1',
          'childs':[
            {
              'label':'Opção 1.1',
              'route':'/select',
            },
            {
              'label':'Opção 1.2',
              'route':'/select',
            },
            {
              'label':'Opção 1.5',
              'childs':[
                {
                  'label':'Opção 1.5.1',
                  'route':'/select',
                },
                {
                  'label':'Opção 1.5.2',
                  'route':'/select',
                },
              ]
            },
            {
              'label':'Opção 1.3',
              'route':'/select',
            },
            {
              'label':'Opção 1.4',
              'route':'/select',
            }
          ]
        },
        'without-category' :{
          'childs':[
            {
              'label':'Opção 1.1',
              'route':'/select',
            },
            {
              'label':'Opção 1.2',
              'route':'/select',
            },
            {
              'label':'Opção 1.5',
              'childs':[
                {
                  'label':'Opção 1.5.1',
                  'route':'/select',
                },
                {
                  'label':'Opção 1.5.2',
                  'route':'/select',
                },
              ]
            },
          ]
        }
      }
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  openMenu(){
    this.showMenu = !this.showMenu;
  }


}
