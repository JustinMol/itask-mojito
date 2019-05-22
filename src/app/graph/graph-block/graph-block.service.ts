import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GraphBlock } from './graph-block';
import { TableEditorComponent } from 'src/app/editors/table-editor/table-editor.component';

const SOURCES: GraphBlock[] = [{
  type: 'user-input',
  name: 'User Input',
  svg: 'assets/svg/source/user.svg',
  description: 'Ask the user to fill in a form of a chosen type.',
  component: TableEditorComponent,
}, {
  type: 'shared-input',
  name: 'Shared Input',
  svg: 'assets/svg/source/shared.svg',
  description: 'Ask the user to fill in a form of a chosen type. The information is automatically shared with other users.',
  component: TableEditorComponent,
}, {
  type: 'clock-input',
  name: 'Clock Input',
  svg: 'assets/svg/source/clock.svg',
  description: '',
}];

const TRANSFORMS: GraphBlock[] = [{
  type: 'task',
  name: 'Task',
  svg: 'assets/svg/transform/task.svg',
  description: '',
}, {
  type: 'code',
  name: 'Code Block',
  svg: 'assets/svg/transform/code.svg',
}];

const CONTROLS: GraphBlock[] = [{
  type: 'choice',
  name: 'Choice',
  svg: 'assets/svg/control/choice.svg',
}, {
  type: 'join',
  name: 'Join',
  svg: 'assets/svg/control/join.svg',
}, {
  type: 'split',
  name: 'Parallel Split',
  svg: 'assets/svg/control/parallel-split.svg',
}];

@Injectable({
  providedIn: 'root'
})
export class GraphBlockService {

  private graphBlocks: Map<string,GraphBlock>;

  constructor() {
    this.graphBlocks = new Map();
    [ ...SOURCES, ...TRANSFORMS, ...CONTROLS ].forEach(g => {
      this.graphBlocks.set(g.type, g);
    });
  }

  public getGraphBlock(type: string): GraphBlock {
    return this.graphBlocks.get(type);
  }

  public getSources(): Observable<GraphBlock[]> {
    return of(SOURCES);
  }

  public getTransforms(): Observable<GraphBlock[]> {
    return of(TRANSFORMS);
  }

  public getControls(): Observable<GraphBlock[]> {
    return of(CONTROLS);
  }

}
