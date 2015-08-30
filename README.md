What's This?
==

This is a little playground I've been using to try out various
docker + vagrant setups. It's constantly changing as I poke
holes in working configurations and try new ones out.

Both services are simple NodeJS services running on Express. They
each conform to the following API:

#### `GET /`
A 200 response with a status message (e.g. "Hello from service 1!")

#### `GET /exit/:code`
Close the connection and exit with a process code. This should
cause the service to go down and be restarted.

### Service 1

This service uses nodemon to monitor filesystem changes and restart
the application. Nodemon is configured to allow docker to manage
restarting the application or container when the service crashes.

### Service 2

This service uses the same docker image as Service 1, but does not
use nodemon at all. Unfortunately that means (for now at least)
that the container has to be manually restarted with every file change.

### TODO
- [ ] Figure out the pros and cons of sharing Docker images between applications
vs. dedicated Docker images for each application. I'm leaning towards the latter.
- [ ] Find a way to speed up the initial build of a dev environment.
Right now it's super slooooooow.
- [ ] Find a better logging strategy.
- [ ] Use docker-compose instead of Vagrant's docker provisioner.
- [ ] Add some other services (e.g. nginx, redis and postgres)
- [ ] Figure out how per-environment configuration can work, and
how managed services (e.g. RDS, ElasticCache) might fit into the mix.

