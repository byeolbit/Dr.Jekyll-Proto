/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { EditorComponent } from './editor.component';

describe('EditorComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        EditorComponent
      ],
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(EditorComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
