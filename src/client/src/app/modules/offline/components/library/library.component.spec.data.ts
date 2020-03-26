export const response = {
    onFilterChangeEvent: {
        'filters': {
            'board': ['State (Test 1)'],
            'appliedFilters': true,
            'medium': ['English'],
            'gradeLevel': ['Class 4']
        },
        'channelId': '01285019302823526477'
    },
    constructSearchRequestWithFilter: {
        'filters': {
            'channel': '01285019302823526477',
            'contentType': ['TextBook']
        },
        'mode': 'soft',
        'facets': ['board', 'medium', 'gradeLevel', 'subject'],
        'params': {
            'orgdetails': 'orgName,email',
            'online': false
        },
        'softConstraints': {
            'badgeAssertions': 98,
            'board': 99,
            'channel': 100
        },
    },
    constructSearchRequestWithOutFacets: {
        'filters': {
            'channel': '01285019302823526477',
            'contentType': ['TextBook']
        },
        'mode': 'soft',
        'params': {
            'orgdetails': 'orgName,email',
            'online': false
        },
        'softConstraints': {
            'badgeAssertions': 98,
            'board': 99,
            'channel': 100
        },
    },
    constructSearchRequestWithOutFilter: {
        'filters': {
            'contentType': ['TextBook']
        },
        'mode': 'soft',
        'facets': ['board', 'medium', 'gradeLevel', 'subject'],
        'params': {
            'orgdetails': 'orgName,email',
            'online': false
        },
        'softConstraints': {
            'badgeAssertions': 98,
            'board': 99,
            'channel': 100
        }
    },
    searchResult: {
        'id': 'api.content.search',
        'ver': '1.0',
        'ts': '2019-12-04T11:52:42.421Z',
        'params': {
            'resmsgid': 'f5214487-8ab8-4e6d-ba8b-1fa74e43753a',
            'msgid': 'f63666bc-7742-48de-b3cd-7a9cc37e58aa',
            'status': 'successful',
            'err': null,
            'errmsg': null
        },
        'responseCode': 'OK',
        'result': {
            'content': [{
                'ownershipType': ['createdFor'],
                'publish_type': null,
                'keywords': ['Addition', 'Carry Over'],
                'subject': 'Mathematics',
                'channel': '01248978648941363234',
                'downloadUrl': 'do_31280197775324774412235/addition_with_carry_over_-_english360p.mp4',
                'organisation': ['Test 1'],
                'language': ['English'],
                'mimeType': 'video/mp4',
                'variants': null,
                'objectType': 'Content',
                'gradeLevel': ['Class 5'],
                'appIcon': 'content/do_31280197775324774412235/dsert-econtent-logo_priority-1_1525846239148.thumb.png',
                'appId': 'prod.diksha.portal',
                'artifactUrl': 'do_31280197775324774412235/addition_with_carry_over_-_english360p.mp4',
                'contentEncoding': 'identity',
                'lockKey': '2d4ec763-5e2e-4308-8f9d-b62a0dfd57c3',
                'contentType': 'Resource',
                'lastUpdatedBy': 'e119d868-0934-4a51-9e6d-9ceb73f87f20',
                'identifier': 'do_31280197775324774412235',
                'audience': ['Learner'],
                'visibility': 'Default',
                'consumerId': '89490534-126f-4f0b-82ac-3ff3e49f3468',
                'mediaType': 'content',
                'osId': 'org.ekstep.quiz.app',
                'lastPublishedBy': 'a85c9122-66ad-4449-9dd0-506ef161f589',
                'version': 1,
                'tags': ['Addition', 'Carry Over'],
                'prevState': 'Review',
                'size': 19204051,
                'lastPublishedOn': '2019-07-18T05:40:47.738+0000',
                'name': 'Addition_with_Carry_Over',
                'attributions': ['Akshara Foundation', ' Bengaluru'],
                'status': 'Live',
                'code': 'e20ad433-9bb7-48c0-a9de-3b7490bd48b0',
                'publishError': null,
                'creators': 'eContent, DSERT',
                'medium': 'English',
                'idealScreenSize': 'normal',
                'createdOn': '2019-07-10T06:50:24.956+0000',
                'contentDisposition': 'inline',
                'lastUpdatedOn': '2019-07-18T05:40:47.259+0000',
                'SYS_INTERNAL_LAST_UPDATED_ON': '2019-07-10T06:50:42.639+0000',
                'dialcodeRequired': 'No',
                'owner': 'Test 1',
                'createdFor': ['01248978648941363234'],
                'creator': 'DSERT eContent',
                'lastStatusChangedOn': '2019-07-18T05:40:47.249+0000',
                'os': ['All'],
                'flagReasons': null,
                'pkgVersion': 1,
                'versionKey': '1563428447259',
                'idealScreenDensity': 'hdpi',
                'framework': 'ka_k-12',
                'lastSubmittedOn': '2019-07-10T06:54:36.925+0000',
                'createdBy': 'e119d868-0934-4a51-9e6d-9ceb73f87f20',
                'compatibilityLevel': 1,
                'contributors': 'Akshara Foundation, Bengaluru',
                'ownedBy': '01248978648941363234',
                'board': 'State (Test 1)',
                'resourceType': 'Learn',
                'baseDir': 'content/do_31280197775324774412235',
                'desktopAppMetadata': {
                    'addedUsing': 'download',
                    'createdOn': 1575460343022,
                    'updatedOn': 1575460343022
                }
            }],
            'count': 1
        }
    },
    sectionData: [
        {
            'name': 'Recently Added',
            'contents': [{
                'name': 'पर्यावरण और हम भाग-२',
                // tslint:disable-next-line: max-line-length
                'image': 'https://ntpproductionall.blob.core.windows.net/ntp-content-production/content/do_31280644484431052816862/artifact/evs-4_1563292815114.thumb.jpg',
                'description': 'Enter description for TextBook',
                'rating': '0',
                'subject': 'Environmental Science',
                'medium': 'Hindi',
                'orgDetails': {},
                'gradeLevel': 'Class 4',
                'contentType': 'TextBook',
                'topic': '',
                'subTopic': '',
                'metaData': {
                    'identifier': 'do_31280644484431052816862',
                    'mimeType': 'application/vnd.ekstep.content-collection',
                    'framework': 'br_k-12',
                    'contentType': 'TextBook'
                },
                'completionPercentage': 0,
                'mimeTypesCount': '{"application/vnd.ekstep.content-collection":25,"video/mp4":36}',
                // tslint:disable-next-line: max-line-length
                'cardImg': 'https://ntpproductionall.blob.core.windows.net/ntp-content-production/content/do_31280644484431052816862/artifact/evs-4_1563292815114.thumb.jpg',
                'resourceType': 'Book',
                'organisation': [
                    'Bihar'
                ],
                'board': 'State (Bihar)',
                'identifier': 'do_31280644484431052816862',
                'mimeType': 'application/vnd.ekstep.content-collection',
                'action': {
                    'onImage': {
                        'eventName': 'onImage'
                    }
                },
                'ribbon': {
                    'left': {
                        'class': 'ui circular label  card-badges-image',
                        'image': undefined
                    },
                    'right': {
                        'name': 'Book',
                        'class': 'ui black right ribbon label'
                    }
                },
                'downloadStatus': undefined,
                'badgeAssertions': undefined,
                'hoverData': undefined
            }]
        },
        {
            'name': 'Environmental Science',
            'contents': [
                {
                    'name': 'पर्यावरण और हम भाग-२',
                    // tslint:disable-next-line: max-line-length
                    'image': 'https://ntpproductionall.blob.core.windows.net/ntp-content-production/content/do_31280644484431052816862/artifact/evs-4_1563292815114.thumb.jpg',
                    'description': 'Enter description for TextBook',
                    'rating': '0',
                    'subject': 'Environmental Science',
                    'medium': 'Hindi',
                    'orgDetails': {},
                    'gradeLevel': 'Class 4',
                    'contentType': 'TextBook',
                    'topic': '',
                    'subTopic': '',
                    'metaData': {
                        'identifier': 'do_31280644484431052816862',
                        'mimeType': 'application/vnd.ekstep.content-collection',
                        'framework': 'br_k-12',
                        'contentType': 'TextBook'
                    },
                    'completionPercentage': 0,
                    'mimeTypesCount': '{"application/vnd.ekstep.content-collection":25,"video/mp4":36}',
                    // tslint:disable-next-line: max-line-length
                    'cardImg': 'https://ntpproductionall.blob.core.windows.net/ntp-content-production/content/do_31280644484431052816862/artifact/evs-4_1563292815114.thumb.jpg',
                    'resourceType': 'Book',
                    'organisation': [
                        'Bihar'
                    ],
                    'board': 'State (Bihar)',
                    'identifier': 'do_31280644484431052816862',
                    'mimeType': 'application/vnd.ekstep.content-collection',
                    'action': {
                        'onImage': {
                            'eventName': 'onImage'
                        }
                    },
                    'ribbon': {
                        'left': {
                            'class': 'ui circular label  card-badges-image',
                            'image': undefined
                        },
                        'right': {
                            'name': 'Book',
                            'class': 'ui black right ribbon label'
                        }
                    },
                    'downloadStatus': undefined,
                    'badgeAssertions': undefined,
                    'hoverData': undefined
                }
            ]
        }],
    searchResult1: {
        'id': 'api.content.search', 'ver': '1.0', 'ts': '2020-03-26T11:42:25.135Z', 'params':
        {
            'resmsgid': 'dcd9bff0-6f56-11ea-8e24-67f1507c452f', 'msgid': '00073d17-854a-d146-080a-bb6775380e68',
            'status': 'successful', 'err': null, 'errmsg': null
        }, 'responseCode': 'OK', 'result': {
            'count': 1, 'content':
                [{
                    'ownershipType': ['createdFor'],
                    'copyright': 'Bihar', 'subject': 'Environmental Science',
                // tslint:disable-next-line: max-line-length
                    'downloadUrl': 'https://ntpproductionall.blob.core.windows.net/ntp-content-production/ecar_files/do_31280644484431052816862/pryaavrnn-aur-hm-bhaag-2_1574390981628_do_31280644484431052816862_7.0_spine.ecar',
                    'channel': '012593397993308160261', 'organisation': ['Bihar'], 'language': ['English'],
                    'variants': {
                        'online':
                // tslint:disable-next-line: max-line-length
                            { 'ecarUrl': 'https://ntpproductionall.blob.core.windows.net/ntp-content-production/ecar_files/do_31280644484431052816862/pryaavrnn-aur-hm-bhaag-2_1574390982097_do_31280644484431052816862_7.0_online.ecar', 'size': 29828 }, 'spine': { 'ecarUrl': 'https://ntpproductionall.blob.core.windows.net/ntp-content-production/ecar_files/do_31280644484431052816862/pryaavrnn-aur-hm-bhaag-2_1574390981628_do_31280644484431052816862_7.0_spine.ecar', 'size': 387941 }
                // tslint:disable-next-line: max-line-length
                    }, 'mimeType': 'application/vnd.ekstep.content-collection', 'leafNodes': ['do_3128727568705208321262', 'do_31277082906125107211342', 'do_3128727570802769921263', 'do_3128968201991782401113', 'do_31277083585675264011527', 'do_31277083557519360011364', 'do_312756749286055936110619', 'do_3128727799493427201299', 'do_3127588034888499201500', 'do_31277082888540160011341', 'do_3128727802967572481300', 'do_31275673734865715219981', 'do_31277083570499584011366', 'do_312897396123705344162', 'do_31277868368870604812214', 'do_31277083845423104011385', 'do_31277868310750822413300', 'do_3128727793819893761299', 'do_3128727795595100161300', 'do_31277082869670707211495', 'do_3128727788715868161295', 'do_31277082821808947211337', 'do_312756737587806208110601', 'do_31277083375413657611358', 'do_312756732969336832110584', 'do_31275673409091174419975', 'do_312756734013079552110591', 'do_3128968105836216321104', 'do_312756737699758080110603', 'do_31277083628686540811528', 'do_3128727796965212161301', 'do_3128727791818670081298', 'do_312756741971574784110609', 'do_312756742545432576110611', 'do_31277082880035225611340'], 'objectType': 'Content', 'appIcon': 'https://ntpproductionall.blob.core.windows.net/ntp-content-production/content/do_31280644484431052816862/artifact/evs-4_1563292815114.thumb.jpg', 'gradeLevel': ['Class 4'], 'children': ['do_31277083585675264011527', 'do_312756742545432576110611', 'do_31275673409091174419975', 'do_31277082888540160011341', 'do_31275673734865715219981', 'do_3128727796965212161301', 'do_3128727799493427201299', 'do_31277083570499584011366', 'do_3128727802967572481300', 'do_31277083375413657611358', 'do_3128968201991782401113', 'do_31277082869670707211495', 'do_31277082906125107211342', 'do_312756732969336832110584', 'do_312756737699758080110603', 'do_312756734013079552110591', 'do_31277083557519360011364', 'do_312897396123705344162', 'do_31277083628686540811528', 'do_3127588034888499201500', 'do_31277868368870604812214', 'do_31277868310750822413300', 'do_31277082880035225611340', 'do_312756737587806208110601', 'do_312756749286055936110619', 'do_312756741971574784110609', 'do_31277082821808947211337', 'do_31277083845423104011385', 'do_3128968105836216321104', 'do_3128727788715868161295', 'do_3128727791818670081298', 'do_3128727793819893761299', 'do_3128727795595100161300', 'do_3128727568705208321262', 'do_3128727570802769921263'], 'appId': 'prod.diksha.portal', 'contentEncoding': 'gzip', 'lockKey': '696a9924-d408-4c78-9eff-79aae19d5e99', 'mimeTypesCount': '{"application/vnd.ekstep.content-collection":25,"video/mp4":36}', 'totalCompressedSize': 906590015, 'contentType': 'TextBook', 'lastUpdatedBy': 'e02bff65-c8cd-40b7-891e-4217d0eef673', 'identifier': 'do_31280644484431052816862', 'audience': ['Learner'], 'toc_url': 'https://ntpproductionall.blob.core.windows.net/ntp-content-production/content/do_31280644484431052816862/artifact/do_31280644484431052816862_toc.json', 'visibility': 'Default', 'contentTypesCount': '{"TextBookUnit":25,"Resource":36}', 'author': 'Bihar', 'childNodes': ['do_31280645221583257616891', 'do_3128727568705208321262', 'do_31277082906125107211342', 'do_31280645221583257616895', 'do_31280645221583257616894', 'do_3128727570802769921263', 'do_31280645221583257616893', 'do_31280645221583257616892', 'do_3128968201991782401113', 'do_31277083585675264011527', 'do_31277083557519360011364', 'do_312756749286055936110619', 'do_3127588034888499201500', 'do_31277082888540160011341', 'do_3128727802967572481300', 'do_31275673734865715219981', 'do_31280645221582438416889', 'do_312897396123705344162', 'do_31277868368870604812214', 'do_31280645221582438416888', 'do_31280645221582438416887', 'do_31280645221580800016883', 'do_31280645221580800016882', 'do_31280645221580800016881', 'do_31277868310750822413300', 'do_31277082869670707211495', 'do_31280645221579980816878', 'do_31280645221579980816879', 'do_31277082821808947211337', 'do_312756732969336832110584', 'do_31275673409091174419975', 'do_3128727796965212161301', 'do_31280645221584076816897', 'do_31280645221584076816896', 'do_31280645221584076816899', 'do_31280645221584076816898', 'do_312756741971574784110609', 'do_31280645221579980816880', 'do_31280645221581619216884', 'do_3128727799493427201299', 'do_31277083570499584011366', 'do_31280645221578342416875', 'do_31277083845423104011385', 'do_3128727793819893761299', 'do_3128727795595100161300', 'do_3128727788715868161295', 'do_312756737587806208110601', 'do_31277083375413657611358', 'do_312756734013079552110591', 'do_3128968105836216321104', 'do_312756737699758080110603', 'do_31280645221579161616877', 'do_31277083628686540811528', 'do_3128727791818670081298', 'do_31280645221579161616876', 'do_31280645221582438416890', 'do_312756742545432576110611', 'do_31280645221581619216885', 'do_31280645221581619216886', 'do_31277082880035225611340'], 'consumerId': 'e85bcfb5-a8c2-4e65-87a2-0ebb43b45f01', 'mediaType': 'content', 'osId': 'org.ekstep.quiz.app', 'lastPublishedBy': '8b1df30f-bdb2-475a-9e31-e2a6c9d4c0b0', 'graph_id': 'domain', 'nodeType': 'DATA_NODE', 'version': 2, 'license': 'CC BY 4.0', 'prevState': 'Review', 'size': 387941, 'lastPublishedOn': '2019-11-22T02:49:41.192+0000', 'name': 'पर्यावरण और हम भाग-२', 'status': 'Live', 'code': 'org.sunbird.CPUZ1q', 'description': 'Enter description for TextBook', 'medium': 'Hindi', 'posterImage': 'https://ntpproductionall.blob.core.windows.net/ntp-content-production/content/do_31280649473830912016907/artifact/evs-4_1563292815114.jpg', 'idealScreenSize': 'normal', 'createdOn': '2019-07-16T14:18:44.158+0000', 'copyrightYear': 2019, 'contentDisposition': 'inline', 'lastUpdatedOn': '2019-11-22T02:49:39.469+0000', 'SYS_INTERNAL_LAST_UPDATED_ON': '2019-11-22T11:00:43.204+0000', 'dialcodeRequired': 'Yes', 'owner': 'Bihar', 'createdFor': ['012593397993308160261'], 'creator': 'BIHAR CREATOR', 'lastStatusChangedOn': '2019-11-22T02:49:39.458+0000', 'os': ['All'], 'pkgVersion': 7, 'versionKey': '1574390979595', 'idealScreenDensity': 'hdpi', 'dialcodes': ['4ZM4F4'], 'depth': 0, 's3Key': 'ecar_files/do_31280644484431052816862/pryaavrnn-aur-hm-bhaag-2_1574390981628_do_31280644484431052816862_7.0_spine.ecar', 'framework': 'br_k-12', 'lastSubmittedOn': '2019-11-22T02:40:37.505+0000', 'createdBy': 'e02bff65-c8cd-40b7-891e-4217d0eef673', 'leafNodesCount': 35, 'compatibilityLevel': 1, 'ownedBy': '012593397993308160261', 'board': 'State (Bihar)', 'resourceType': 'Book', 'node_id': 938045
                }]
        }
    }
};
