export const filters = [
  {
    'code': 'board',
    'dataType': 'text',
    'name': 'Board/Syllabus',
    'label': 'Board/Syllabus',
    'description': 'Education Board/Syllabus',
    'editable': true,
    'inputType': 'select',
    'required': false,
    'displayProperty': 'Editable',
    'visible': true,
    'renderingHints': {
      'semanticColumnWidth': 'three'
    },
    'index': 1,
    'range': [
      {
        'identifier': 'test_board_1',
        'code': 'test_board',
        'translations': null,
        'name': 'TEST_BOARD',
        'description': '',
        'index': 1,
        'category': 'board',
        'status': 'Live'
      }
    ]
  },
  {
    'code': 'medium',
    'dataType': 'text',
    'name': 'Medium',
    'label': 'Medium',
    'description': 'Medium of instruction',
    'editable': true,
    'inputType': 'select',
    'required': false,
    'displayProperty': 'Editable',
    'visible': true,
    'renderingHints': {
      'semanticColumnWidth': 'three'
    },
    'index': 2,
    'range': [
      {
        'identifier': 'test_medium_assamese',
        'code': 'test_medium',
        'translations': null,
        'name': 'TEST_MEDIUM',
        'description': '',
        'index': 1,
        'category': 'medium',
        'status': 'Live'
      }
    ]
  },
  {
    'code': 'gradeLevel',
    'dataType': 'text',
    'name': 'Class',
    'label': 'Class',
    'description': 'Grade',
    'editable': true,
    'inputType': 'select',
    'required': false,
    'displayProperty': 'Editable',
    'visible': true,
    'renderingHints': {
      'semanticColumnWidth': 'three'
    },
    'index': 3,
    'range': [
      {
        'identifier': 'test_gradelevel_kindergarten',
        'code': 'kindergarten',
        'translations': null,
        'name': 'KG',
        'description': 'KG',
        'index': 1,
        'category': 'gradelevel',
        'status': 'Live'
      }
    ]
  },
  {
    'code': 'subject',
    'dataType': 'text',
    'name': 'Subject',
    'label': 'Subject',
    'description': 'Subject of the Content to use to teach',
    'editable': true,
    'inputType': 'select',
    'required': false,
    'displayProperty': 'Editable',
    'visible': true,
    'renderingHints': {
      'semanticColumnWidth': 'three'
    },
    'index': 4,
    'range': [
      {
        'identifier': 'test_subject_accountancy',
        'code': 'accountancy',
        'translations': null,
        'name': 'Accountancy',
        'description': 'Accountancy',
        'index': 1,
        'category': 'subject',
        'status': 'Live'
      }
    ]
  },
  {
    'code': 'contentType',
    'dataType': 'text',
    'name': 'Content Types',
    'label': 'Content Types',
    'description': 'Content Types',
    'editable': true,
    'inputType': 'select',
    'required': false,
    'displayProperty': 'Editable',
    'visible': true,
    'range': [
      {
        'name': 'TextBook'
      },
      {
        'name': 'Collection'
      },
      {
        'name': 'LessonPlan'
      },
      {
        'name': 'Resource'
      }
    ],
    'renderingHints': {
      'semanticColumnWidth': 'four'
    },
    'index': 5
  }
];

export const searchRequest = {
  'filters': {
    'board': [
      'TEST_BOARD'
    ],
    'contentType': [
      'Collection',
      'TextBook',
      'LessonPlan',
      'Resource'
    ]
  },
  'params': {
    'orgdetails': 'orgName,email',
    'framework': 'TEST',
  },
  'query': 'mathe',
  'facets': [
    'board',
    'medium',
    'gradeLevel',
    'subject',
    'contentType'
  ]
};

export const visitsEvent = {
  visits: [
    {
      'objid': 'do_3125010999257169921165',
      'objtype': 'Resource',
      'index': 0
    },
    {
      'objid': 'do_31254586690550169628776',
      'objtype': 'Resource',
      'index': 1
    }
  ]
};

export const onlineSearchRequest = {
  'filters': {
    'channel': '505c7c48ac6dc1edc9b08f21db5a571d',
    'contentType': [
      'Collection',
      'TextBook',
      'LessonPlan',
      'Resource'
    ]
  },
  'mode': 'soft',
  'params': {
    'orgdetails': 'orgName,email',
    'framework': 'TEST'
  },
  'query': 'test',
  'facets': [
    'board',
    'medium',
    'gradeLevel',
    'subject',
    'contentType'
  ],
  'softConstraints': {
    'badgeAssertions': 98,
    'board': 99,
    'channel': 100
  }
};

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

export const searchResponse = {
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
};

export const utilDataCards =
[
  {
    'name': 'Be_vocal',
    'rating': '0',
    'orgDetails': {},
    'gradeLevel': '',
    'contentType': 'LearningOutcomeDefinition',
    'topic': '',
    'subTopic': '',
    'metaData': {
      'identifier': 'do_2129654502588989441158',
      'mimeType': 'application/vnd.ekstep.ecml-archive',
      'contentType': 'LearningOutcomeDefinition'
    },
    'completionPercentage': 0,
    'mimeTypesCount': 0,
    'cardImg': 'assets/images/book.png',
    'resourceType': 'Learn',
    'board': 'State (Tamil Nadu)',
    'identifier': 'do_2129654502588989441158',
    'mimeType': 'application/vnd.ekstep.ecml-archive',
    'desktopAppMetadata': {
      'addedUsing': 'import',
      'createdOn': 1586927789430,
      'updatedOn': 1586927789430,
      'isAvailable': true,
      'lastUpdateCheckedOn': 1586958673299
    },
    'action': {
      'onImage': {
        'eventName': 'onImage'
      }
    },
    'ribbon': {
      'left': {
        'class': 'ui circular label  card-badges-image'
      },
      'right': {
        'name': 'Learn',
        'class': 'ui black right ribbon label'
      }
    },
    'telemetryInteractEdata': {
      'id': 'dial-code-view-card',
      'type': 'click',
      'pageid': 'get-dial'
    },
    'telemetryObjectType': 'public'
  },
  {
    'name': 'Expl MP4',
    'rating': '0',
    'orgDetails': {},
    'gradeLevel': '',
    'contentType': 'eTextBook',
    'topic': '',
    'subTopic': '',
    'metaData': {
      'identifier': 'do_2129895224835686401102',
      'mimeType': 'application/vnd.ekstep.ecml-archive',
      'framework': 'tn_k-12_custodian',
      'contentType': 'eTextBook'
    },
    'completionPercentage': 0,
    'mimeTypesCount': 0,
    'cardImg': 'assets/images/book.png',
    'resourceType': 'Learn',
    'board': 'State (Tamil Nadu)',
    'identifier': 'do_2129895224835686401102',
    'mimeType': 'application/vnd.ekstep.ecml-archive',
    'desktopAppMetadata': {
      'addedUsing': 'import',
      'createdOn': 1586927789429,
      'updatedOn': 1586927789429,
      'isAvailable': true,
      'lastUpdateCheckedOn': 1586951818375
    },
    'action': {
      'onImage': {
        'eventName': 'onImage'
      }
    },
    'ribbon': {
      'left': {
        'class': 'ui circular label  card-badges-image'
      },
      'right': {
        'name': 'Learn',
        'class': 'ui black right ribbon label'
      }
    },
    'telemetryInteractEdata': {
      'id': 'dial-code-view-card',
      'type': 'click',
      'pageid': 'get-dial'
    },
    'telemetryObjectType': 'public'
  }
];

export const onlineHoverData = [
  {
    'name': 'Be_vocal',
    'contentType': 'LearningOutcomeDefinition',
    'metaData': {
      'identifier': 'do_2129654502588989441158',
      'mimeType': 'application/vnd.ekstep.ecml-archive',
      'framework': 'tn_k-12_custodian',
      'contentType': 'LearningOutcomeDefinition'
    },
    'organisation': [
      'Tamil Nadu'
    ],
    'hoverData': {
      'note': '',
      'actions': [
        {
          'type': 'download',
          'label': 'Download',
          'disabled': false
        },
        {
          'type': 'open',
          'label': 'Open'
        }
      ]
    },
    'board': 'State (Tamil Nadu)',
    'identifier': 'do_2129654502588989441158',
    'mimeType': 'application/vnd.ekstep.ecml-archive',
    'desktopAppMetadata': {
      'addedUsing': 'import',
      'createdOn': 1587046561015,
      'updatedOn': 1587101533412,
      'isAvailable': false,
      'lastUpdateCheckedOn': 1587103941175
    },
    'action': {
      'onImage': {
        'eventName': 'onImage'
      }
    },
    'ribbon': {
      'left': {
        'class': 'ui circular label  card-badges-image'
      },
      'right': {
        'name': 'Learn',
        'class': 'ui black right ribbon label'
      }
    },
    'telemetryInteractEdata': {
      'id': 'dial-code-view-card',
      'type': 'click',
      'pageid': 'get-dial'
    },
    'telemetryObjectType': 'public'
  },
  {
    'name': 'Expl MP4',
    'metaData': {
      'identifier': 'do_2129895224835686401102',
      'mimeType': 'video/mp4',
      'framework': 'tn_k-12_custodian',
      'contentType': 'eTextBook'
    },
    'hoverData': {
      'note': 'Go to \'My Downloads\' to find this content',
      'actions': [
        {
          'type': 'download',
          'label': 'Downloaded',
          'disabled': true
        },
        {
          'type': 'open',
          'label': 'Open'
        }
      ]
    },
    'board': 'State (Tamil Nadu)',
    'identifier': 'do_2129895224835686401102',
    'mimeType': 'video/mp4',
    'desktopAppMetadata': {
      'addedUsing': 'import',
      'createdOn': 1587039656918,
      'updatedOn': 1587039656918,
      'isAvailable': true,
      'lastUpdateCheckedOn': 1587119447324
    },
    'action': {
      'onImage': {
        'eventName': 'onImage'
      }
    },
    'ribbon': {
      'left': {
        'class': 'ui circular label  card-badges-image'
      },
      'right': {
        'name': 'Learn',
        'class': 'ui black right ribbon label'
      }
    },
    'telemetryInteractEdata': {
      'id': 'dial-code-view-card',
      'type': 'click',
      'pageid': 'get-dial'
    },
    'telemetryObjectType': 'public'
  }
];
export const offlineHoverData = [
  {
    'name': 'Be_vocal',
    'contentType': 'LearningOutcomeDefinition',
    'metaData': {
      'identifier': 'do_2129654502588989441158',
      'mimeType': 'application/vnd.ekstep.ecml-archive',
      'framework': 'tn_k-12_custodian',
      'contentType': 'LearningOutcomeDefinition'
    },
    'organisation': [
      'Tamil Nadu'
    ],
    'hoverData': {
      'note': '',
      'actions': [
        {
          'type': 'save',
          'label': 'Save to Pen drive',
          'disabled': false
        },
        {
          'type': 'open',
          'label': 'Open'
        }
      ]
    },
    'board': 'State (Tamil Nadu)',
    'identifier': 'do_2129654502588989441158',
    'mimeType': 'application/vnd.ekstep.ecml-archive',
    'desktopAppMetadata': {
      'addedUsing': 'import',
      'createdOn': 1587046561015,
      'updatedOn': 1587101533412,
      'isAvailable': false,
      'lastUpdateCheckedOn': 1587103941175
    },
    'action': {
      'onImage': {
        'eventName': 'onImage'
      }
    },
    'ribbon': {
      'left': {
        'class': 'ui circular label  card-badges-image'
      },
      'right': {
        'name': 'Learn',
        'class': 'ui black right ribbon label'
      }
    },
    'telemetryInteractEdata': {
      'id': 'dial-code-view-card',
      'type': 'click',
      'pageid': 'get-dial'
    },
    'telemetryObjectType': 'public'
  },
  {
    'name': 'Expl MP4',
    'metaData': {
      'identifier': 'do_2129895224835686401102',
      'mimeType': 'video/mp4',
      'framework': 'tn_k-12_custodian',
      'contentType': 'eTextBook'
    },
    'hoverData': {
      'note': 'Go to \'My Downloads\' to find this content',
      'actions': [
        {
          'type': 'save',
          'label': 'Save to Pen drive',
          'disabled': false
        },
        {
          'type': 'open',
          'label': 'Open'
        }
      ]
    },
    'board': 'State (Tamil Nadu)',
    'identifier': 'do_2129895224835686401102',
    'mimeType': 'video/mp4',
    'desktopAppMetadata': {
      'addedUsing': 'import',
      'createdOn': 1587039656918,
      'updatedOn': 1587039656918,
      'isAvailable': true,
      'lastUpdateCheckedOn': 1587119447324
    },
    'action': {
      'onImage': {
        'eventName': 'onImage'
      }
    },
    'ribbon': {
      'left': {
        'class': 'ui circular label  card-badges-image'
      },
      'right': {
        'name': 'Learn',
        'class': 'ui black right ribbon label'
      }
    },
    'telemetryInteractEdata': {
      'id': 'dial-code-view-card',
      'type': 'click',
      'pageid': 'get-dial'
    },
    'telemetryObjectType': 'public'
  }
];



