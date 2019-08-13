# Train-Schedule

## Getting Started
A deployed version of the sight can be found here https://edwardmara.github.io/TrainTime/

## Usage
Train schedule is populated by firebase's real time database.  Users can add to the table by submitting information in the input form.  Data values from the form will create a new JSON that will be added to the firebase database.  The train schedule table will automatically populate with the updated data.

## Challenges
Had permission errors initially, but was able to fix the access rules in the firebase dashboard itself.  I allowed all users to read and write from/on this database.  This is fine and dandy for the educational purposes of this app because no personal or sensitive data is being stored.  However for future more practical purposes, I would implement a user authentication system to secure data access.

## Authors
Edward Mara