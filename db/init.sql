CREATE TABLE bands
(
  id serial primary key,
  id_tm VARCHAR(25) unique not null, 
  name VARCHAR(255) not null,
  page_url_tm VARCHAR(255)
);

CREATE TABLE shows
(
  id serial primary key,
  id_tm VARCHAR(25) unique not null,
  band_id integer references bands(id) not null,
  name VARCHAR(255) not null,
  datetime_utc VARCHAR(50) not null,
  page_url_tm VARCHAR(255),
  venue_name VARCHAR(255),
  venue_lat_lon VARCHAR(50)
);
