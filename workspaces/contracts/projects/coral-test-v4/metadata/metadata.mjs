import constructorArgs from '../config.json' assert { type: 'json' };

export const metadata = {
  name: constructorArgs.name,
  description: 'Updated metadata test',
  attributes: [{ trait_type: 'Type', value: 'All Access' }],
};
