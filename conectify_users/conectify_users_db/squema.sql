use conectify_users_db;

create table USERS_STATUS (
    id int not null auto_increment,
    Status varchar(100) not null,
    PRIMARY KEY (id)
);

create table USERS_PROFILE (
    id int not null auto_increment,
    names varchar(100) not null,
    lastNames varchar(100) not null,
    photoId varchar(100) not null,
    eMail varchar(100) not null,
    status int not null,
    phoneNumber  varchar(100) not null,
    sso_userId  varchar(100) not null,
    PRIMARY KEY (id),
    foreign key (status) references USERS_STATUS(id)
);

create table USERS_SAVED_ELEMENTS (
    id int not null auto_increment,
    idUser int not null,
    idElement int not null,
    PRIMARY KEY (id),
    foreign key (idUser) references USERS_PROFILE(id)
);

INSERT INTO USERS_STATUS (id, Status)
values (1, "Disponible");
INSERT INTO USERS_STATUS (id, Status)
values (2, "Ocupado");
INSERT INTO USERS_STATUS (id, Status)
values (3, "Ausente");

INSERT INTO USERS_PROFILE (names, lastNames, photoId, eMail, status, phoneNumber,sso_userId) 
values ("Pepe", "Rodriguez", "1", "pepe@unal.edu.co", 1, "3150000000","1");
INSERT INTO USERS_PROFILE (names, lastNames, photoId, eMail, status, phoneNumber,sso_userId) 
values ("Juan", "Torres", "1", "juan@unal.edu.co", 1, "3150000001","2");
INSERT INTO USERS_PROFILE (names, lastNames, photoId, eMail, status, phoneNumber,sso_userId) 
values ("Ana", "Cortez", "1", "ana@unal.edu.co", 1, "3150000002","3");