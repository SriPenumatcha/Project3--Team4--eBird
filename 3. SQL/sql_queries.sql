select * from Species;
select * from Locations;
select * from Observations;

--display data of a particular species
--species with species code 'hudgod'
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

--Which 10 locations did birdwatchers visit the most?
select l.locname, l.lat, l.lng, count(distinct o.obsdt) as "Total Days of Observations", l.subnational2code
from Observations o
Inner Join Locations l on
o.locid = l.locid
group by l.locname, l.lat, l.lng, l.subnational2code
order by "Total Days of Observations" DESC
Limit 20;

--Copy above results to Output folder
copy (select l.locname, l.lat, l.lng, count(distinct o.obsdt) as "Total Days of Observations", l.subnational2code
from Observations o
Inner Join Locations l on
o.locid = l.locid
group by l.locname, l.lat, l.lng, l.subnational2code
order by "Total Days of Observations" DESC
Limit 20) to '/Users/yashadakulkarni/Desktop/WORK/DataAnalyticsBootcamp/HOMEWORK/eBird-Data-Visualisation/SQL_Output/results_observation_days.csv' with csv header


--Which 10 locations had max species diversity? 
select l.locname, l.lat, l.lng, count(distinct o.speciescode) as "Total Number of Species Observed", l.subnational2code
from Observations o
Inner Join Locations l on
o.locid = l.locid
group by l.locname, l.lat, l.lng, l.subnational2code
order by "Total Number of Species Observed" DESC
Limit 20;

--Copy above results to Output folder
copy (select l.locname, l.lat, l.lng, count(distinct o.speciescode) as "Total Number of Species Observed", l.subnational2code
from Observations o
Inner Join Locations l on
o.locid = l.locid
group by l.locname, l.lat, l.lng, l.subnational2code
order by "Total Number of Species Observed" DESC
Limit 20) to '/Users/yashadakulkarni/Desktop/WORK/DataAnalyticsBootcamp/HOMEWORK/eBird-Data-Visualisation/SQL_Output/results_species_diversity.csv' with csv header
