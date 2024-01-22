import { Command, Option } from 'commander';
import { App } from './src/App';
import { Car } from './src/types';

const p = new Command();

p.command('add')
  .description('Add a car to the database, providing a car brand, model, year and price in RUB.')
  .requiredOption('-e, --email <email>', 'E-mail for authentication')
  .requiredOption('-p, --password <password>', 'Password for authentication')
  .requiredOption('-b, --brand <brand>', 'Car brand (required)')
  .requiredOption('-m, --model <model>', 'Car model (required)')
  .requiredOption('-y, --year <year>', 'Car manufacturing year (required)')
  .requiredOption('-c, --price <price>', 'Car price (required)')
  .action(async (options, command) => {
    const app = new App({ email: options.email, password: options.password });
    const car: Car = {
      brand: options.brand,
      model: options.model,
      year: options.year,
      price: options.price,
    };
    const savedCar = await app.add(car).catch((error) => {
      console.log('❌ Error!');
      console.log(error.message);
    });

    if (savedCar) {
      console.log('✅ Successfully added!');
      console.log(savedCar);
    }
  });

p.command('find')
  .description(
    'Find cars that match filters for brand, model, year and price. The output can be sorted by brand, model, year or price in ascending or descending order. By default, no filters are applied and the output is sorted by brand name in ascending order.'
  )
  .requiredOption('-e, --email <email>', 'E-mail for authentication')
  .requiredOption('-p, --password <password>', 'Password for authentication')
  .option('-b, --brand <brand>', 'Car brand')
  .option('-m, --model <model>', 'Car model')
  .option('-y, --year <year>', 'Car manufacturing year')
  .option('-c, --price <price>', 'Car price')
  .addOption(
    new Option('-s, --sortField <sortField>', 'A field used for sorting').choices(['brand', 'model', 'year', 'price'])
  )
  .addOption(new Option('-d, --sortDirection <sortDirection>', 'Sort direction').choices(['ASC', 'DESC']))
  .action(async (options, command) => {
    const app = new App({ email: options.email, password: options.password });
    const foundCars = await app.find(options).catch((error) => {
      console.log('❌ Error!');
      console.log(error.message);
    });

    if (foundCars) {
      const carCount = foundCars.length === 1 ? `${foundCars.length} car` : `${foundCars.length} cars`;
      console.log(`🔍 Found ${carCount}:`);
      console.log(foundCars);
    }
  });

p.command('update')
  .description('Update a car in the database by id, providing brand, model, year and price in RUB.')
  .requiredOption('-e, --email <email>', 'E-mail for authentication')
  .requiredOption('-p, --password <password>', 'Password for authentication')
  .requiredOption('-i, --id <id>', 'Car id (required)')
  .requiredOption('-b, --brand <brand>', 'Car brand (required)')
  .requiredOption('-m, --model <model>', 'Car model (required)')
  .requiredOption('-y, --year <year>', 'Car manufacturing year (required)')
  .requiredOption('-c, --price <price>', 'Car price (required)')
  .action(async (options, command) => {
    const car: Required<Car> = {
      _id: options.id,
      brand: options.brand,
      model: options.model,
      year: options.year,
      price: options.price,
    };
    const app = new App({ email: options.email, password: options.password });
    const updatedCar = await app.update(car).catch((error) => {
      console.log('❌ Error!');
      console.log(error.message);
    });

    if (updatedCar) {
      console.log('✅ Successfully updated!');
      console.log(updatedCar);
    }
  });

p.command('delete')
  .description('Delete a car from the database by id.')
  .requiredOption('-e, --email <email>', 'E-mail for authentication')
  .requiredOption('-p, --password <password>', 'Password for authentication')
  .requiredOption('-i, --id <id>', 'Car id (required)')
  .action(async (options, command) => {
    const app = new App({ email: options.email, password: options.password });
    const deletedCar = await app.delete(options.id).catch((error) => {
      console.log('❌ Error!');
      console.log(error.message);
    });

    if (deletedCar) {
      console.log('✅ Successfully deleted!');
      console.log(deletedCar);
    }
  });

p.parse(process.argv);
