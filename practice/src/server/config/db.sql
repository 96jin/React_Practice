-- Active: 1666439271459@@127.0.0.1@3306@study1
create database practice;
use practice;

create table movie(
  id int AUTO_INCREMENT,
  title varchar(30) not null,
  director varchar(30) not null,
  running_time int not null,
  constraint primary key (id,title)
);

insert into movie values
(1,'반지의 제왕','김철수',120),
(2,'인생은 아름다워','이민호',115),
(3,'오펀 천사의 탄생','신동엽',125);

select * from movie;

insert into movie (title,director,running_time) values
('해운대','송강호',122);