import fs from 'fs';
import { parse } from 'csv-parse';

export const parseCsv = (file: string) => {
  return new Promise((resolve, reject) => {
    let readStream = fs.createReadStream(file);

    let fileRows: string[][] = [];
    const parser = parse({
      delimiter: ',',
    });

    parser.on('readable', () => {
      let record;
      while ((record = parser.read())) {
        if (record) {
          fileRows.push(record[1].trim());
        }
      }
    });

    parser.on('error', (err) => {
      console.error(err.message);
    });

    parser.on('end', () => {
      const { lines } = parser.info;
      console.log(`${lines} lines processed by CSV Parser \n`);
      resolve(fileRows);
    });

    readStream.on('open', () => {
      readStream.pipe(parser);
    });

    readStream.on('error', (err) => {
      resolve({ status: null, error: 'readStream error' + err });
    });
  });
};
