default: start clean build test deploy

start: vagrant.up

clean: service1.clean

build: service1.build

test: service1.test

deploy: vagrant.copy vagrant.provision

watch:
	fswatch -o ./service1/*.js | xargs -n1 -I{} make test deploy

stop: vagrant.halt

service1.clean:
	-rm -rf service1/node_modules

service1.build:
	cd ./service1; npm install

service1.test:
	cd ./service1; npm test

service1.start:
	cd ./service1; npm run start

vagrant.up:
	vagrant up

vagrant.provision:
	vagrant provision

vagrant.reload:
	vagrant reload

vagrant.halt:
	vagrant halt

vagrant.copy:
	vagrant rsync