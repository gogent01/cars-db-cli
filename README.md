# cars-db-cli

A simple CLI for a database API with information about various cars. Supports user authentication and CRUD operations upon the car database for authorized users.

## How to install

```bash
# 1. Install packages
npm install

# 2. Install ts-node globally and run index.ts
npm install -g ts-node
ts-node index.ts <command> [arguments]

# 3. Alternatively, run build command and execute index.js from the build folder
npm install -g typescript
tsc
cd dist
node index.js <command> [arguments]
```

## How to use

This CLI provides 4 commands to interact with the car database: `add`, `find`, `update`, and `delete`. Help on arguments for each command can be found by using --help option:
```bash
ts-node index.ts <command> --help
```
For convenience, repository scripts contain preconfigured commands for each CRUD operation: `add-car`, `find-cars`, `update-car`, `delete-car`. You can use them like this:
```bash
npm run add-car
# ts-node index.ts add -e user@example.com -p P4ssword! --brand Citroen --model C4 --year 2020 --price 2600000

npm run find-cars
# ts-node index.ts find -e user@example.com -p P4ssword! --brand Nissan -s price -d DESC

npm run update-car
# ts-node index.ts update -e user@example.com -p P4ssword! --id 65adb11a62a59cd5a788934d --brand Fiat --model 500 --year 2019 --price 2800000

npm run delete-car
# ts-node index.ts delete -e user@example.com -p P4ssword! --id 65ae2b6cc22c079b13d8c285
```
