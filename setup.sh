cd rigBrain/
npm install
cd src/
pm2 delete krypton
pm2 start index.js --name krypton -f