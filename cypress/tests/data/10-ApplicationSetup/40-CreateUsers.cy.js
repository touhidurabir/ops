/**
 * @file cypress/tests/data/40-CreateUsers.spec.js
 *
 * Copyright (c) 2014-2021 Simon Fraser University
 * Copyright (c) 2000-2021 John Willinsky
 * Distributed under the GNU GPL v3. For full terms see the file docs/COPYING.
 *
 */

describe('Data suite tests', function() {
	it('Creates users', function() {
		cy.login('admin', 'admin');
		cy.get('a:contains("admin"):visible').click();
		cy.get('a:contains("Dashboard")').click();
		cy.get('a:contains("Users & Roles")').click();

		var users = [
			{
				'username': 'rvaca',
				'givenName': 'Ramiro',
				'familyName': 'Vaca',
				'country': 'Mexico',
				'affiliation': 'Universidad Nacional Autónoma de México',
				'mustChangePassword': true,
				'roles': ['Preprint Server manager']
			}, {
				'username': 'dbarnes',
				'givenName': 'Daniel',
				'familyName': 'Barnes',
				'country': 'Australia',
				'affiliation': 'University of Melbourne',
				'roles': ['Preprint Server manager']
			}, {
				'username': 'dbuskins',
				'givenName': 'David',
				'familyName': 'Buskins',
				'country': 'United States',
				'affiliation': 'University of Chicago',
				'roles': ['Moderator']
			}, {
				'username': 'sberardo',
				'givenName': 'Stephanie',
				'familyName': 'Berardo',
				'country': 'Canada',
				'affiliation': 'University of Toronto',
				'roles': ['Moderator']
			}, {
				'username': 'minoue',
				'givenName': 'Minoti',
				'familyName': 'Inoue',
				'country': 'Japan',
				'affiliation': 'Kyoto University',
				'roles': ['Moderator']
			}
		];
		users.forEach(user => {
			cy.createUser(user);
		});
		cy.logout();
		var user = users[0];
		if (!('email' in user)) user.email = user.username + '@mailinator.com';
		if (!('password' in user)) user.password = user.username + user.username;

		cy.login(user.username);
		cy.resetPassword(user.username, user.password);
		cy.logout();
	});
})
