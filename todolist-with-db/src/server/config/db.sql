-- Active: 1666439271459@@127.0.0.1@3306@practice
create table todolist (
  idx smallint AUTO_INCREMENT,
  todo varchar(30),
  constraint primary key(idx)
);

insert into todolist (todo) values ('공부하기');

select * from todolist;

delete from todolist