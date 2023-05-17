create database conectify_users_db;

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
    photoId int not null,
    eMail varchar(100) not null,
    status int not null,
    phoneNumber  varchar(100) not null,
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

INSERT INTO USERS_PROFILE (names, lastNames, photoId, eMail, status, phoneNumber) 
values ("Pepe", "Rodriguez", 1, "pepe@unal.edu.co", 1, "3150000000");
INSERT INTO USERS_PROFILE (names, lastNames, photoId, eMail, status, phoneNumber) 
values ("Juan", "Torres", 2, "juan@unal.edu.co", 1, "3150000001");
INSERT INTO USERS_PROFILE (names, lastNames, photoId, eMail, status, phoneNumber) 
values ("Ana", "Cortez", 3, "ana@unal.edu.co", 1, "3150000002");