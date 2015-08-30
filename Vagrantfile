Vagrant.configure("2") do |config|

  config.vm.box = "trusty64"
  config.vm.box_url = "http://cloud-images.ubuntu.com/vagrant/trusty/current/trusty-server-cloudimg-amd64-vagrant-disk1.box"
  config.vm.network :forwarded_port, guest: 8001, host: 8001
  config.vm.network :forwarded_port, guest: 8002, host: 8002
  config.vm.synced_folder "", "/vagrant", disabled: true
  config.vm.synced_folder "", "/var/src"

  config.vm.provider :virtualbox do |v|
    v.memory = 1024
    v.cpus = 2
  end

  config.vm.provision :shell do |s|

    s.inline = <<-heredoc

        # TODO: Installing docker via the provisioner
        #   is remarkably slow. Also, no vagrant support
        #   for docker-container without a plugin. shell
        #   provisioning instead?
        # apt-get update
        # apt-get install -y --no-install-recommends docker

        if which docker; then
          echo 'Stopping all running containers'
          docker stop $(docker ps -a -q) || echo 'No running containers to stop'
          echo 'Removing all known containers'
          docker rm $(docker ps -a -q) || echo 'No containers to remove'
        fi
      heredoc
  end

  config.vm.provision :docker do |d|
    
    # All of this would be better suited to docker-compose
    d.build_image "/var/src/docker/node", args: "-t node"

    d.run "service1",
      image: "node",
      args: "-it -p 8001:8888 -v /var/src/service1:/var/src",
      cmd: "dev"

    d.run "service2",
      image: "node",
      args: "-it -p 8002:8888 -v /var/src/service2:/var/src"
  end
end
