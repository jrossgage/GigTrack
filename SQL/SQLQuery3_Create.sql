USE [master]

IF db_id('GigTrack') IS NULL
    CREATE DATABASE[GigTrack]
GO

USE [GigTrack]
GO

DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [Client];
DROP TABLE IF EXISTS [Gig];
DROP TABLE IF EXISTS [Location];
DROP TABLE IF EXISTS [Expense];
GO

CREATE TABLE [UserProfile] (
  [Id] int PRIMARY KEY IDENTITY NOT NULL,
  [Name] nvarchar(25) NOT NULL,
  [Email] nvarchar(255),
  [FirebaseUserId] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Client] (
  [Id] int PRIMARY KEY IDENTITY NOT NULL,
  [CompanyName] nvarchar(255) NOT NULL,
  [PhoneNumber] int NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [UserId] int NOT NULL
)
GO

CREATE TABLE [Gig] (
  [Id] int PRIMARY KEY IDENTITY NOT NULL,
  [Pay] int NOT NULL,
  [Date] datetime NOT NULL,
  [Mileage] int NOT NULL,
  [ClientId] int NOT NULL,
  [VenueName] nvarchar(255) NOT NULL,
  [LocationId] int NOT NULL,
  [Notes] nvarchar(MAX) NOT NULL,
  [UserId] int NOT NULL
)
GO

CREATE TABLE [Location] (
  [Id] int PRIMARY KEY IDENTITY NOT NULL,
  [City] nvarchar(255) NOT NULL,
  [State] nvarchar(255) NOT NULL,
  [UserId] int NOT NULL
)
GO

CREATE TABLE [Expense] (
  [Id] int PRIMARY KEY IDENTITY NOT NULL,
  [Name] nvarchar(255) NOT NULL,
  [Cost] int NOT NULL,
  [Date] datetime NOT NULL,
  [UserId] int NOT NULL
)
GO

ALTER TABLE [Gig] ADD FOREIGN KEY ([UserId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Location] ADD FOREIGN KEY ([UserId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Expense] ADD FOREIGN KEY ([UserId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Client] ADD FOREIGN KEY ([UserId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Gig] ADD FOREIGN KEY ([ClientId]) REFERENCES [Client] ([Id])
GO

ALTER TABLE [Gig] ADD FOREIGN KEY ([LocationId]) REFERENCES [Location] ([Id])
GO