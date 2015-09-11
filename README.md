What's This?
==

This is a little playground I've been using to try out various
[Docker](https://www.docker.com/) + [Vagrant](https://vagrantup.com) setups. It's constantly changing as I poke
holes in working configurations and try new ones out.

Both services are simple NodeJS services running on [Express](https://expressjs.com). They
each conform to the following API:

##### `GET /`
A 200 response with a status message (e.g. "Hello from service 1!")

##### `GET /exit/:code`
Close the connection and exit with a process code. This should
cause the service to go down and be restarted.

### Getting started (OS X)
Download [Virtualbox](https://www.virtualbox.org/wiki/Downloads) and [Vagrant](https://www.vagrantup.com/downloads.html), then open up a shell and...

```
$ git clone https://github.com/ninjascribble/docker-test.git /path/to/project
$ cd /path/to/project
$ make dev
```

**Note:** The Docker installer runs `apt-get update` which may break VBox Guest Additions. To keep everything working smoothly [you might want to install the `vagrant-vbguest` plugin](https://github.com/dotless-de/vagrant-vbguest):

```
$ vagrant plugin install vagrant-vbguest
$ vagrant reload
```

### Service 1

Default: [http://localhost:8001](http://localhost:8001)

This service uses nodemon to monitor filesystem changes and restart
the application. Nodemon is configured to allow docker to manage
restarting the application or container when the service crashes.

### TODO
- [ ] Figure out the pros and cons of sharing Docker images between applications
vs. dedicated Docker images for each application. I'm leaning towards the latter.
- [ ] Find a way to speed up the initial build of a dev environment.
Right now it's super slooooooow.
- [ ] Find a better logging strategy.
- [x] Use docker-compose instead of Vagrant's docker provisioner.
- [ ] Add some other services (e.g. nginx, redis and postgres)
- [ ] Figure out how per-environment configuration can work, and
how managed services (e.g. RDS, ElasticCache) might fit into the mix.

