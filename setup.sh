cd rigBrain/
npm install
cd src/

pm2 ls
pm2 delete -s krypton || :
pm2 start index.js --name krypton -f
pm2 save