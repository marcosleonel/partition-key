# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

- [SPIKE] Investigate the implcations of a migration, potential problems and possible solutions
  - Check if the creation of this new column will increase the database size enough to required a "sharding" process.
  - Profile some planned queries using `explain` or `explain analyze` to check for the one that delivers the best performance.
  - Document on this ticket the result of tests and research to be discussed with the team. Create a Design Doc if needed.
  - Add any further step or information to the other tasks of the Epic
    ACCPTANCE CRITERIA: Justified plan to create the new column
    ESTIMATE: 4h
  
- [MIGRATION] Create column `facility_agent_id` and set it across related tables
  - Create a column called `facility_agent_id` on `Facilities` as `UUIDv4` type and set it as primary key
  - Create index for the new column.
  - Create `facility_agent_id` column on `Shifts` table as `UUIDv4` type and set it as a Foreign Key
  - Populate the new column on `Shifts`  with the IDs created on `Facilities` table.
  - Create `facility_agent_id` on `Agents` table as `UUIDv4` type and set it as a Foreign Key
  - Populate the new column with the IDs created on `Facilities` table.
    ACCPTANCE CRITERIA: `Agents`, `Facilities` and `Shifts` tables should have the `facility_agent_id` column filled with the ID created by `Facilities`
    ESTIMATE: 4h

- [REFACTORING] Update functions that adds a agent to the Facilities table
  - Update the functions that can insert or update user data to a Facility row. It should take the `facility_agent_id` when it is created on `Facilities` table and update the `Agents` and `Shift` tables using less transactions as possible.
  - Update automated tests.
    ACCPTANCE CRITERIA: `facility_agent_id` should be created on `Agents`, `Facilities` and `Shifts` tables each time and all test passing with 100% of coverage (justify is this rate is not achieved).
    ESTIMATE: 4h

- [REFACTORING] Update `generateReport` function to use `facility_agent_id` to create the report
  - Update `generateReport` to use the new column `facility_agent_id` to join information from the tables to genrate the report using less transactions as possible.
  - Update automated tests.
    ACCPTANCE CRITERIA: The app should be able to use `facility_agent_id` to generate a full report and and all test passing with 100% of coverage (justify is this rate is not achieved).
    ESTIMATE: 4h
