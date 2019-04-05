VeloxChain Website project
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
  #DB_HOST: 127.0.0.1
  #DB_PORT: 3306
  #DB_USERNAME: root
  #DB_PASS: password
2. Create a database which named by volatacycle
3. Import DB by mysql_script/volatacycle_export.sql file

### Start project as development environment
cd .. && npm start



### AWS EC2 Update website
1. `sudo chmod 400 path/to/VeloxChain_Website.pem` (do only once)
2. Now ssh to the server
`ssh ec2-user@34.222.148.157 -i path/to/VeloxChain_Website.pem`
3. cd VeloxChain_Website
4. Type `git pull` to fetch latest data
5. Type `pm2 reload all` to reload the website 
