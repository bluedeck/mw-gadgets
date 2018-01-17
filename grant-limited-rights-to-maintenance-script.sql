use db1;

grant select on db1.* to maintenance_bot@localhost;
    
grant insert on db1.contents to maintenance_bot@localhost;
grant insert on db1.feeds to maintenance_bot@localhost;
grant insert on db1.histories to maintenance_bot@localhost;
grant insert on db1.history_clearance to maintenance_bot@localhost;
grant insert on db1.notifications to maintenance_bot@localhost;
grant insert on db1.pages to maintenance_bot@localhost;
grant insert on db1.sessions to maintenance_bot@localhost;
grant insert on db1.users to maintenance_bot@localhost;

grant update on db1.feeds to maintenance_bot@localhost;
grant update on db1.notifications to maintenance_bot@localhost;
grant update on db1.pages to maintenance_bot@localhost;
grant update on db1.sessions to maintenance_bot@localhost;
grant update on db1.users to maintenance_bot@localhost;

grant delete on db1.history_clearance to maintenance_bot@localhost;
grant delete on db1.sessions to maintenance_bot@localhost;
