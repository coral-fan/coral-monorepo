import { task } from 'hardhat/config';

task('test-task', 'This is a Hardhat Test Task').setAction(async () => {
  console.log('hardhat test task');
});
