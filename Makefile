default: clean build test

clean: service1.clean

build: service1.build

test: clearscreen timestamp service1.test

clearscreen:
	@clear

timestamp:
	@date

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

dev.watch.test:
	@echo "Watching ./service1/**/*.js... (run tests)"
	@fswatch -rot -e "*" -i "*.js" ./service1 | xargs -n1 -I{} $(MAKE) test

dev.watch.deploy:
	@echo "Watching ./service1/**/*.js... (run tests and deploy)"
	@fswatch -rot -e "*" -i "*.js" ./service1 | xargs -n1 -I{} $(MAKE) test dev.deploy

.PHONY: default clean build test clearscreen timestamp service1.clean service1.build \
	service1.test service1.start dev dev.start dev.deploy dev.watch.test dev.watch.deploy
