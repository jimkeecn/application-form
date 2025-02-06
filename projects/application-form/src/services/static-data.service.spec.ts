import { TestBed } from '@angular/core/testing';

import { StaticDataService } from './static-data.service';
import { IStaticDataGroup, StaticDataGroup } from '../models/interface/staticData';

describe('StaticDataService', () => {
  let service: StaticDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaticDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('staticData', () => {
    it('should initialize staticData$ with an empty IStaticDataGroup', (done) => {
      service.staticData.subscribe((data) => {
        expect(data.titles).toEqual([]); // Check for empty object
        expect(data.communicationsPreferences).toEqual([]); // Check for empty object
        expect(data.countries).toEqual([]); // Check for empty object
        expect(data.referencesTypes).toEqual([]); // Check for empty object
        expect(data.securityQuestions).toEqual([]); // Check for empty object
        done();
      });
    });

    it('should update staticData$ correctly', (done) => {
      const mockData = new StaticDataGroup();
      mockData.titles = [{ id: 1, name: 'test' }];
      service.setStaticData(mockData);
  
      service.staticData.subscribe((data) => {
        expect(data.titles).toEqual([{ id: 1, name: 'test' }]); // Compare specific properties
        done();
      });
    });
  })

  describe('products', () => {
    it('should initiate products$', (done) => { 
      service.products.subscribe(data => { 
        expect(data).toEqual([]);
        done();
      })
    })

    it('should update products$ correctly', (done) => { 
      const mockData = [{ id: 1, name: 'test' }];
      service.setProducts(mockData);
      service.products.subscribe(data => { 
        expect(data).toEqual(mockData);
        done();
      })
    });
  })

  describe('accountTypes', () => {
    it('should initiate accountTypes$', (done) => { 
      service.accountTypes.subscribe(data => { 
        expect(data).toEqual([]);
        done();
      })
    })

    it('should update accountTypes$ correctly', (done) => { 
      const mockData = [{ id: 1, name: 'test' }];
      service.setAccountTypes(mockData);
      service.accountTypes.subscribe(data => { 
        expect(data).toEqual(mockData);
        done();
      })
    });
  })
});
