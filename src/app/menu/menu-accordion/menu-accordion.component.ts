import { Component, AfterContentInit, ContentChildren, QueryList } from '@angular/core';
import { MenuPanelComponent } from '../menu-panel/menu-panel.component';

@Component({
  selector: 'app-menu-accordion',
  templateUrl: './menu-accordion.component.html',
  styleUrls: ['./menu-accordion.component.less']
})
export class MenuAccordionComponent implements AfterContentInit {
  @ContentChildren(MenuPanelComponent) panels: QueryList<MenuPanelComponent>;

  ngAfterContentInit() {
    this.panels.forEach(panel => {
      panel.toggle.subscribe(() => {
        panel.isOpen = !panel.isOpen;
      });
    });
  }
}
