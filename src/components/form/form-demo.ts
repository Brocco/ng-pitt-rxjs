import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, FormBuilder} from 'angular2/common';

@Component({
  selector: 'form-demo',
  template: `
		<h3>Form Demo</h3>
    <form [ngFormModel]="testForm">
      <div class="row">
        <span>Password: </span>
        <input type="text" ngControl="password" />
      </div>
      <div class="row">
        Val: <span>{{passwordStrength}}</span>
      </div>
      <div class="row">
        Async: <span>{{passwordStrengthStream | async}}</span>var fs = require('fs'),
	path = require('path'),
	q = require('q'),
	rx =  require('rxjs/Rx'),
	_ = require('lodash'),
	cfg = require('./package.json').config;

var directoryContentsArrayRx = rx.Observable.create(function(observer){
	fs.readdir(cfg.startingPoint, function(err, dirContents){
		if (err) { observer.error(err); }
		observer.next(dirContents);
		observer.complete();
	});
});

var groupsRx = directoryContentsArrayRx.mergeMap(function(dirContents){
	var groups;

	var groupsDef = dirContents.filter(function(dirContentItemName){
		return dirContentItemName === path.basename(cfg.startingPoint) + '.json';
	});

	if (groupsDef.length){
		groups = require(path.join(process.cwd(), cfg.startingPoint, groupsDef[0]));
	}else{
		groups = dirContents.filter(function(dirContentItemName){
			return fs.statSync(path.join(cfg.startingPoint, dirContentItemName)).isDirectory()
		}).map(function(name){
			return { name:name };
		});
	}

	return rx.Observable.from(groups);

});

var groupMembersRx = groupsRx.mergeMap(function(group){
	group.members = [];
	var groupPath = path.join(process.cwd(), cfg.startingPoint, group.name);
	return rx.Observable.create(function(observer){
		fs.readdir(groupPath, function(err, groupMembers){
			if (err) { observer.error(err); }

			var groupMembersDef = groupMembers.filter(function(dirContentItemName){
				return dirContentItemName === path.basename(groupPath) + '.json';
			});

			if (groupMembersDef.length){
				group.members = require(path.join(groupPath, groupMembersDef[0]));
			}else{
				group.members = groupMembers.filter(function(dirContentItemName){
					return fs.statSync(path.join(groupPath, dirContentItemName)).isDirectory()
				}).map(function(dirContentItemName){
					return { id: dirContentItemName };
				});
			}
			observer.next(group);
			observer.complete();
		});
	});
});

var groupsWithFacetedMembersRx = groupMembersRx.mergeMap(function(group){
	return rx.Observable.from(group.members).switchMap(function(member){
		return rx.Observable.create(function(observer){
			var memberPath = path.join(process.cwd(), cfg.startingPoint, group.name, member.id);
			fs.readdir(memberPath, function(err, facets){
				facets.forEach(function(facet){
					var o = {};
					var extensionLessName = path.basename(facet, '.json');
					o[extensionLessName] = require(path.join(memberPath, facet));
					_.assign(member, o);
				});
				observer.next(member);
				observer.complete();
			});
		});
	}, function(member, facetedMember){
		return facetedMember;
	});
}, function(group, members){
	return group;
});

var subscriber = groupsWithFacetedMembersRx.subscribe(function(group, i){
	console.log('group: ', JSON.stringify(group, undefined, 2))
}, function(err){
	console.log('ERROR! ', err);
}, function(){
	console.log('DONE!');
});
      </div>
    </form>
	`
})
export class FormDemo {
  constructor(formBuilder: FormBuilder) {
    this.testForm = formBuilder.group({ password: '' });

    this.passwordStrengthStream = this.testForm.controls.password.valueChanges
      .map(val => val.length)
      .map((len) => {
        let passwordStrength = '';
        if (!len) {
          passwordStrength = 'required';
        } else if (len <= 2) {
          passwordStrength = 'weak';
        } else if (len <= 4) {
          passwordStrength = 'moderate';
        } else if (len <= 6) {
          passwordStrength = 'strong';
        } else {// (len <= 8) {
          passwordStrength = 'very strong';
        }
        return passwordStrength;
      });

    this.passwordStrengthStream.subscribe(result => this.passwordStrength = result);
  }

  public testForm: any;
  public passwordStrength: string;
  public passwordStrengthStream;
}

