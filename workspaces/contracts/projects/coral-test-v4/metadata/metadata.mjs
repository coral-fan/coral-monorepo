import constructorArgs from '../config.json' assert { type: 'json' };

console.log(constructorArgs);

export const metadata = {
  name: constructorArgs.name,
  description:
    '"Computers rely on the one and the zero to represent all things. This distinction between something and nothing—this pivotal separation between being and nonbeing—is quite fundamental and underlies many Creation myths."',
  attributes: [{ trait_type: 'Type', value: 'All Access', key: 'type' }],
};
