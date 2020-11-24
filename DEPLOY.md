# Deploying the lounge webapp in production
1. SSH into the GCP virtual machine
2. Pull the most recent changes from master
    - `git checkout master`
    - `git pull`
3. Install dependencies
    - `npm i`
4. Run predeploy script
    - `npm run predeploy`
5. If this is the first time deploying on the machine run
    - `npm run deploy:initial`
6. If not run
    - `npm run deploy`
7. Check if the nginx service is running
    - `npm run check`
