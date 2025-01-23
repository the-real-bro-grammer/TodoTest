-- Create the "User" table
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users') THEN
        CREATE TABLE Users (
            Id SERIAL PRIMARY KEY,
            Email VARCHAR(255) NOT NULL UNIQUE,
            PasswordHash TEXT NOT NULL,
            PasswordSalt TEXT NOT NULL
        );
    END IF;
END $$;

-- Create the "Organization" table
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'organization') THEN
        CREATE TABLE Organization (
            Id SERIAL PRIMARY KEY,
            Title VARCHAR(255) NOT NULL,
            OwnerId INT NOT NULL,
            CONSTRAINT FK_Organization_User FOREIGN KEY (OwnerId) REFERENCES Users(Id)
        );
    END IF;
END $$;

-- Create the "UsersInOrganization" table
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users_in_organization') THEN
        CREATE TABLE UsersInOrganization (
            UserId INT NOT NULL,
            OrganizationId INT NOT NULL,
            PRIMARY KEY (UserId, OrganizationId),
            CONSTRAINT FK_UsersInOrg_User FOREIGN KEY (UserId) REFERENCES Users(Id),
            CONSTRAINT FK_UsersInOrg_Org FOREIGN KEY (OrganizationId) REFERENCES Organization(Id)
        );
    END IF;
END $$;

-- Create the "Project" table
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'project') THEN
        CREATE TABLE Project (
            Id SERIAL PRIMARY KEY,
            Title VARCHAR(255) NOT NULL,
            OrganizationId INT NOT NULL,
            ProjectOwnerId INT NOT NULL,
            CONSTRAINT FK_Project_Organization FOREIGN KEY (OrganizationId) REFERENCES Organization(Id),
            CONSTRAINT FK_Project_User FOREIGN KEY (ProjectOwnerId) REFERENCES Users(Id)
        );
    END IF;
END $$;

-- Create the "Task" table
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'task') THEN
        CREATE TABLE Task (
            Id SERIAL PRIMARY KEY,
            Title VARCHAR(255) NOT NULL,
            Description TEXT,
            CreatorId INT NOT NULL,
            AsigneeId INT,
            CreationDate TIMESTAMP DEFAULT NOW(),
            ProjectId INT NOT NULL,
            Status VARCHAR(50),
            CONSTRAINT FK_Task_Creator FOREIGN KEY (CreatorId) REFERENCES Users(Id),
            CONSTRAINT FK_Task_Asignee FOREIGN KEY (AsigneeId) REFERENCES Users(Id),
            CONSTRAINT FK_Task_Project FOREIGN KEY (ProjectId) REFERENCES Project(Id)
        );
    END IF;
END $$;

-- Create the "TaskComments" table
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'task_comments') THEN
        CREATE TABLE TaskComments (
            Id SERIAL PRIMARY KEY,
            Comments TEXT NOT NULL,
            AuthorId INT NOT NULL,
            CreationDate TIMESTAMP DEFAULT NOW(),
            CONSTRAINT FK_TaskComments_User FOREIGN KEY (AuthorId) REFERENCES Users(Id)
        );
    END IF;
END $$;
