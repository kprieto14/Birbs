TRUNCATE TABLE "Users", "Birds" RESTART IDENTITY;

INSERT INTO "Users" ("FullName", "Email", "HashedPassword") VALUES ('Sarah', 'sarah@suncoast.io', 'xxxxx');

INSERT INTO "Birds" ("Name", "AdoptedFrom", "YearPublished", "SeasonCollection", "HolidayCollection", "UserId") VALUES ('Junior', 'Target', '2024', 'Spring', 'Spring', 1)