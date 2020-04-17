import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ElectronDialogService } from './electron-dialog.service';
import {SharedModule} from '@sunbird/shared';
import {CoreModule} from '@sunbird/core';

describe('ElectronDialogService', () => {
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedModule.forRoot(), CoreModule],
      providers: []
    });
  });
  it('should be created', () => {
    service = TestBed.get(ElectronDialogService);
    expect(service).toBeTruthy();
  });
  it('should call showContentLocationChangePopup', () => {
    spyOn(service, 'post');
    service.showContentLocationChangePopup();
    expect(service.post).toHaveBeenCalledWith({url: 'content/suggestLocation'});
  });
});
