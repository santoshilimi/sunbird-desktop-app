export const dialCodeResponse = {
    'id': 'api.page.assemble',
    'ver': '1.0',
    'ts': '2020-04-16T09:45:40.299Z',
    'params': {
      'resmsgid': '4b2ed0d3-7628-467f-9e07-edd28d1a1612',
      'msgid': '421b0276-e59e-452a-83fd-e85f40b61f8e',
      'status': 'successful',
      'err': null,
      'errmsg': null
    },
    'responseCode': 'OK',
    'result': {
      'response': {
        'ignoredSections': [],
        'name': 'DIAL Code Consumption',
        'id': '0126541330541690882',
        'sections': [
          {
            'display': '{\'name\':{\'en\':\'Linked Content\'}}',
            'alt': null,
            'description': null,
            'index': 1,
            'sectionDataType': 'content',
            'facets': [],
            'imgUrl': null,
            'name': 'Linked Content',
            'id': '0126541330342952961',
            'dynamicFilters': null,
            'dataSource': null,
            'apiId': 'api.content.search',
            'group': 1,
            // tslint:disable-next-line:max-line-length
            'searchQuery': '{\'request\':{\'source\':\'app\',\'name\':\'DIAL Code Consumption\',\'filters\':{\'dialcodes\':\'x8j8m4\',\'contentType\':[\'TextBook\',\'TextBookUnit\']},\'userProfile\':{\'board\':\'State (Assam)\'},\'sort_by\':{\'createdOn\':\'desc\'}}}',
            'contents': [
              {
                'channel': '01264213333340979214',
                'downloadUrl': 'do_2129654502588989441158/1582696789084_do_2129654502588989441158.zip',
                'mimeType': 'application/vnd.ekstep.ecml-archive',
                'variants': null,
                'objectType': 'Content',
                'contentType': 'LearningOutcomeDefinition',
                'identifier': 'do_2129654502588989441158',
                'audience': [
                  'Learner'
                ],
                'visibility': 'Parent',
                'mediaType': 'content',
                'name': 'Be_vocal',
                'dialcodeRequired': 'No',
                'board': 'State (Tamil Nadu)',
                'resourceType': 'Learn',
                'baseDir': 'content/do_2129654502588989441158',
                'desktopAppMetadata': {
                  'addedUsing': 'import',
                  'createdOn': 1586927789430,
                  'updatedOn': 1586927789430,
                  'isAvailable': true,
                  'lastUpdateCheckedOn': 1586958673299
                }
              },
              {
                'downloadUrl': 'do_2129895224835686401102/20200318_1202181.mp4',
                'channel': '01264213333340979214',
                'objectType': 'Content',
                'artifactUrl': 'do_2129895224835686401102/20200318_1202181.mp4',
                'contentType': 'eTextBook',
                'identifier': 'do_2129895224835686401102',
                'visibility': 'Parent',
                'mediaType': 'content',
                'name': 'Expl MP4',
                'dialcodeRequired': 'No',
                'framework': 'tn_k-12_custodian',
                'compatibilityLevel': 1,
                'board': 'State (Tamil Nadu)',
                'resourceType': 'Learn',
                'baseDir': 'content/do_2129895224835686401102',
                'mimeType': 'application/vnd.ekstep.ecml-archive',
                'desktopAppMetadata': {
                  'addedUsing': 'import',
                  'createdOn': 1586927789429,
                  'updatedOn': 1586927789429,
                  'isAvailable': true,
                  'lastUpdateCheckedOn': 1586951818375
                }
              }
            ]
          }
        ]
      }
    }
  };
