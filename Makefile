default: clean build test

clean: service1.clean

build: service1.build

test: service1.test

service1.clean:
	-rm -rf service1/node_modules

service1.build:
	cd ./service1; npm install

service1.test:
	cd ./service1; npm test

service1.start:
	cd ./service1; npm run start

dev: dev.start clean build test dev.deploy

dev.start:
	vagrant up

dev.stop:
	vagrant halt

dev.deploy:
	vagrant rsync
	vagrant provision

dev.watch:
	fswatch -o ./service1/*.js | xargs -n1 -I{} $(MAKE) test dev.deploy