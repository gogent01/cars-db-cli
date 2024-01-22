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
```
