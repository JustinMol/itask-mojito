import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less']
})
export class WelcomeComponent implements OnInit {

  constructor(
    private storage: LocalStorageService,
    private http: HttpClient
  ) {}

  ngOnInit() {}

  loadDemo1() {
    const fnames = [
      '__recordType2IOnwveH2',
      '__taskGmX-eLtSJ'
    ].map(fname => `demo/${fname}.json`);
    return this.readFiles(fnames).subscribe(files => {
      for (const {key, file} of files) {
        this.storage.set(key, file);
      }
    });
  }

  prepareExercise1() {
    this.saveFiles()
    this.storage.clearAll();
    this.loadDemo1();
  }

  loadDemo2() {
    const fnames = [
      '__recordTypeTz2VoKMct',
      '__task8Z8ACbtg6',
      '__task9qcyLW1p9',
      '__taskLB1xN4Hu2'
    ].map(fname => `demo/${fname}.json`);
    return this.readFiles(fnames).subscribe(files => {
      for (const {key, file} of files) {
        this.storage.set(key, file);
      }
    });
  }

  prepareExercise2() {
    this.saveFiles();
    this.storage.clearAll();
    this.loadDemo2();
  }

  readFiles(fnames: string[]): Observable<{ fname: string, key: string, file: any }[]> {
    return forkJoin(fnames.map(fname => {
      const matched = /^.*(__(recordType|task)[-_a-zA-Z0-9]+)(\.json)?$/.exec(fname);
      if (!matched || !matched[1]) {
        throw new Error(`File name '${fname}' did not match`);
      }

      const [, key] = matched;
      return this.http.get(`assets/${fname}`)
        .pipe(map(file => {
          const split = fname.split('/');
          return { fname: split[split.length - 1], key, file };
        }))
      }));
  }

  async loadSolutions() {
    this.storage.clearAll();
    this.loadDemo1();
    this.loadDemo2();
    const solutions = [
      'T1E1__recordType-P1m3WJxT.json',
      'T1E1__task3s0v95DX7.json',
      'T1E2__recordType8Xch3r2RP.json',
      'T1E2__recordTypeldxRyGGlk.json',
      'T1E2__recordTypext7Lecbye.json',
      'T1E2__tasksWCW6XwFk.json',
      'T2E1__recordTypeCu6Dnc2Sz.json',
      'T2E1__task867p0TYuC.json',
      'T2E2__recordType8HI4jozow.json',
      'T2E2__recordTypegShZ5pydh.json',
      'T2E2__taskzBGjiipmy.json',
      'T3E1__recordTypeRldLfZ8Uq.json',
      'T3E1__taskbKcSs_PhT.json',
      'T3E2__recordType2ui-yVJD3.json',
      'T3E2__taskFMvTdmAow.json',
    ];

    const files = await this.readFiles(solutions.map(s => `solutions/${s}`)).toPromise();
    for (const {key, file, fname} of files) {
      file.name = fname.split('__')[0] + (file.name || file._name);
      this.storage.set(key, file);
    }

    window.location.reload();
  }

  clearStorage() {
    this.storage.clearAll();
    window.location.reload();
  }

  saveFiles() {
    this.storage.keys().filter(k => ![
      '__recordTypeTz2VoKMct',
      '__task8Z8ACbtg6',
      '__task9qcyLW1p9',
      '__taskLB1xN4Hu2',
      '__recordType2IOnwveH2',
      '__taskGmX-eLtSJ'
    ].includes(k)).forEach(k => {
      const json = JSON.stringify(this.storage.get(k));
      download(json, `${new Date().toUTCString()}-${k}`, 'application/json');
    })
  }

}

function download(content, fileName, contentType) {
  const a = document.createElement('a');
  const file = new Blob([content], {type: contentType});
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}
