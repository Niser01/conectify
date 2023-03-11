create database conectify_users_db;
use conectify_users_db;

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
    idType int not null,
    PRIMARY KEY (id),
    foreign key (idUser) references USERS_PROFILE(id)
);

create table USERS_STATUS (
    id int not null auto_increment,
    Status varchar(100) not null,
    PRIMARY KEY (id)
);