import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GraphBlock } from './graph-block';

const SOURCES = [{
  name: 'User Input',
  svg: 'assets/svg/source/user.svg',
  description: 'Ask the user to fill in a form of a chosen type.'
}, {
  name: 'Shared Input',
  svg: 'assets/svg/source/shared.svg',
  description: 'Ask the user to fill in a form of a chosen type. The information is automatically shared with other users.'
}, {
  name: 'Clock Input',
  svg: 'assets/svg/source/clock.svg',
}];

const TRANSFORMS = [{
  name: 'Task',
  svg: 'assets/svg/transform/task.svg',
}, {
  name: 'Code Block',
  svg: 'assets/svg/transform/code.svg',
}];

const CONTROLS = [{
  name: 'Choice',
  svg: 'assets/svg/control/choice.svg',
}, {
  name: 'Join',
  svg: 'assets/svg/control/join.svg',
}, {
  name: 'Parallel Split',
  svg: 'assets/svg/control/parallel-split.svg',
}];

@Injectable({
  providedIn: 'root'
})
export class GraphBlockService {

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
