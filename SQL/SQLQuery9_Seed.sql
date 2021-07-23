USE [GigTrack]
GO

set identity_insert [UserProfile] on
insert into UserProfile (Id, FirebaseUserId, [Name], Email) VALUES (1,'1','Frank Bill', 'frank@bar.com');
insert into UserProfile (Id, FirebaseUserId, [Name], Email) VALUES (2,'2','Sally Sandwich', 'sally@bar.com');
insert into UserProfile (Id, FirebaseUserId, [Name], Email) VALUES (3,'3','Ed Edds', 'ed@bar.com');
set identity_insert [UserProfile] off 


set identity_insert [Gig] on
insert into Gig (Id, [pay], [date], mileage, clientId, venueName, locationId, notes, userId) VALUES (1, 100, 08/08/2021, 45, 1, 'The Basement', 1, 'Load in was fine. Good gig.', 1);
insert into Gig (Id, [pay], [date], mileage, clientId, venueName, locationId, notes, userId) VALUES (2, 150, 04/18/2021, 24, 2, 'The Ryman', 2, 'Load in stunk. Venue was not pretty at all.', 2);
insert into Gig (Id, [pay], [date], mileage, clientId, venueName, locationId, notes, userId) VALUES (3, 175, 12/08/2021, 143, 3, 'The Cordelle', 3, 'Some sweet gig cheese!', 3);
set identity_insert [Gig] off

set identity_insert [Client] on
insert into Client (Id, companyName, phoneNumber, email, userId) VALUES (1, 'The Wedding Band', 555-258-8888, 'wedding@bar.com', 1);
insert into Client (Id, companyName, phoneNumber, email, userId) VALUES (2, 'Country Artist', 555-333-9999, 'country@bar.com', 2);
insert into Client (Id, companyName, phoneNumber, email, userId) VALUES (3, 'Corporate Band', 555-456-7891, 'corporate@bar.com', 3);
set identity_insert [Client] off

set identity_insert [Location] on
insert into [Location] (Id, city, [state], userId) VALUES (1, 'Nashville', 'Tennessee', 1);
insert into [Location] (Id, city, [state], userId) VALUES (2, 'Memphis', 'Tennessee', 2);
insert into [Location] (Id, city, [state], userId) VALUES (3, 'Huntsville', 'Alabama', 3);
set identity_insert [Location] off

set identity_insert [Expense] on
insert into Expense (Id, [name], cost, [date], userId) VALUES (1, 'guitar strings', 10, 07/24/2021, 1);
insert into Expense (Id, [name], cost, [date], userId) VALUES (2, 'Amp', 350, 02/17/2021, 2);
insert into Expense (Id, [name], cost, [date], userId) VALUES (3, 'Picks', 5, 05/02/2021, 3);
set identity_insert [Expense] off