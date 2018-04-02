# Snackify

CREATE TABLE snackify(
   _id serial primary key,
   "userName" varchar,
   "avatar" varchar,
   voteCount integer,
   submissionCount integer,
   snackPhoto varchar,
   votes integer
   );

CREATE TABLE events(
    _id serial primary key, 
    id varchar, 
    summary varchar, 
    "htmlLink" varchar,
    sequence integer, 
    "createdAt" timestamp, 
    "updatedAt" timestamp,
    start timestamp, 
    "end" timestamp
  );