select * from Species;
select * from Locations;
select * from Observations;

--display data of species with species code 'hudgod'
select s.comname, s.sciname
from Species s
where speciescode = 'hudgod';

--display all location ids where the hudsonian godwit was sighted
select s.comname, s.sciname, o.locid, o.howMany
from Species s
Inner Join Observations o on
s.speciesCode = o.speciesCode
where s.comname = 'Hudsonian Godwit';

--display all location ids where the hudsonian godwit was sighted on date 25/4/2024 4 pm.
select s.comname, s.sciname, o.locid, o.howMany, o.obsdt
from Species s
Inner Join Observations o on
s.speciesCode = o.speciesCode
where s.comname = 'Hudsonian Godwit'
and o.obsdt = '2024-05-25 16:00:00';

--Top 10 locations most visited and birds sighted 
select l.locname, l.lat, l.lng, count(o.obsdt) as "Total Days of Observations" 
from Observations o
Inner Join Locations l on
o.locid = l.locid
group by l.locname, l.lat, l.lng
order by "Total Days of Observations" DESC
Limit 10;


copy (select l.locname, l.lat, l.lng, count(o.obsdt) as "Total Days of Observations" 
from Observations o
Inner Join Locations l on
o.locid = l.locid
group by l.locname, l.lat, l.lng
order by "Total Days of Observations" DESC
Limit 10) to '/Users/yashadakulkarni/Desktop/WORK/DataAnalyticsBootcamp/HOMEWORK/eBird-Data-Visualisation/SQL_Output/results.csv' with csv header