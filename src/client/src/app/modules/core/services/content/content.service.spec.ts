import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ConfigService } from '@sunbird/shared';
import { ContentService } from './content.service';

describe('ContentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ContentService, ConfigService, HttpClient]
    });
  });

  it('should be created', inject([ContentService], (service: ContentService) => {
    expect(service).toBeTruthy();
  }));
  it('should call emitContentFullScreenEvent ', () => {
    const contentService = TestBed.get(ContentService);
    spyOn(contentService, 'emitContentFullScreenEvent');
    contentService.emitContentFullScreenEvent();
    expect(contentService.emitContentFullScreenEvent).toHaveBeenCalled();
  });
});
