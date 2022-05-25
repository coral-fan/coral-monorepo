import constructorArgs from '../config.json' assert { type: 'json' };

export const metadata = {
  name: constructorArgs.name,
  description: 'Description',
  attributes: [{ trait_type: 'Type', value: 'Value', key: 'type' }],
};
