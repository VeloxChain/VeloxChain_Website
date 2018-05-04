Volatacycles project
=========================


## Install
### Requirements

1. node: https://nodejs.org/en/download/
2. docker-compose: https://docs.docker.com/compose/install/

### Clone this repository

git clone https://github.com/volatacycles/BikeCoinWebsite.git && cd BikeCoinWebsite

### Install module dependencies

npm install

### Start docker for MySQL virtual machine

cd docker && docker-compose up -d

### Export mysql database
1. Access mysql database local by
  DB_HOST: 127.0.0.1
  DB_PORT: 3306
  DB_USERNAME: root
  DB_PASS: password
2. Create a database which named by volatacycle
3. Import DB by mysql_script/volatacycle_export.sql file

### Start project as development environment
cd .. && npm start
