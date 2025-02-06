import { TestBed } from '@angular/core/testing';

import { RelationshipService } from './relationship.service';
import { IAccountRelationship } from '../models/interface/relationship';
import { IProductEntityRestriction } from '../models/interface/entity';

describe('RelationshipService', () => {
  let service: RelationshipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelationshipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe('accountRelationship', () => { 
    it('initiate accountRelationship with an empty array', (done) => {
      service.accountRelationship.subscribe((data) => { 
        expect(data).toEqual([]);
        done();
      });
    });

    it('should set accountRelationship', (done) => {
      const mockData:IAccountRelationship[] = [{
        relationshipName: 'test',
        accountType: 'test',
        isDisabled: false,
        mandatory: true,
        min: 1,
        max: 2
      }]
      service.setAccountRelationship(mockData);
      service.accountRelationship.subscribe((data) => { 
        expect(data).toEqual(mockData);
        done();
      });
    });
  })

  describe('productEntitiesRestrictions', () => { 
    it('initiate productEntitiesRestrictions with an empty array', (done) => {
      service.accountRelationship.subscribe((data) => { 
        expect(data).toEqual([]);
        done();
      });
    });

    it('should set productEntitiesRestrictions', (done) => {
      const mockData:IProductEntityRestriction[] = [{
        entityName: 'test'
      }]
      service.setProductEntitiesRestrictions(mockData);
      service.productEntitiesRestrictions.subscribe((data) => { 
        expect(data).toEqual(mockData);
        done();
      });
    });
  })
});
