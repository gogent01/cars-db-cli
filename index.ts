import { App } from './src/App';
import { Command, Option } from 'commander';
import { Car } from './src/types';

const p = new Command();

p.command('add')
  .requiredOption('-e, --email <email>', 'E-mail for authentication')
  .requiredOption('-p, --password <password>', 'Password for authentication')
  .requiredOption('-b, --brand <brand>', "A car's brand")
  .requiredOption('-m, --model <model>', "A car's model")
  .requiredOption('-y, --year <year>', "A car's manufacturing year")
  .requiredOption('-c, --price <price>', "A car's price")
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
  .requiredOption('-e, --email <email>', 'E-mail for authentication')
  .requiredOption('-p, --password <password>', 'Password for authentication')
  .option('-b, --brand <brand>', "A car's brand")
  .option('-m, --model <model>', "A car's model")
  .option('-y, --year <year>', "A car's manufacturing year")
  .option('-c, --price <price>', "A car's price")
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
  .requiredOption('-e, --email <email>', 'E-mail for authentication')
  .requiredOption('-p, --password <password>', 'Password for authentication')
  .requiredOption('-i, --id <id>', "A car's id")
  .requiredOption('-b, --brand <brand>', "A car's brand")
  .requiredOption('-m, --model <model>', "A car's model")
  .requiredOption('-y, --year <year>', "A car's manufacturing year")
  .requiredOption('-c, --price <price>', "A car's price")
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
  .requiredOption('-e, --email <email>', 'E-mail for authentication')
  .requiredOption('-p, --password <password>', 'Password for authentication')
  .requiredOption('-i, --id <id>', "A car's id")
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
