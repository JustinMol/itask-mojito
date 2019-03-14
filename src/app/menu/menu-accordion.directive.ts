import { Directive, AfterContentInit, ContentChildren, QueryList } from '@angular/core';
import { MenuPanelComponent } from './menu-panel.component';

@Directive({
  selector: 'app-menu-accordion'
})
export class MenuAccordionDirective implements AfterContentInit {
  @ContentChildren(MenuPanelComponent) panels: QueryList<MenuPanelComponent>;

  ngAfterContentInit() {
    this.panels.forEach(panel => {
      panel.toggle.subscribe(() => {
        panel.isOpen = !panel.isOpen;
      });
    });
  }
}
