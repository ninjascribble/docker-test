# I'm putting a comment here
Vagrant.configure("2") do |config|

  config.vm.box = "trusty64"
  config.vm.box_url = "http://cloud-images.ubuntu.com/vagrant/trusty/current/trusty-server-cloudimg-amd64-vagrant-disk1.box"
  config.vm.network :forwarded_port, guest: 8001, host: 8001
  config.vm.network :forwarded_port, guest: 8002, host: 8002
  config.vm.synced_folder "", "/vagrant", disabled: true
  config.vm.synced_folder "", "/var/src", type: "rsync", rsync__exclude: ".git/"

  config.vm.provider :virtualbox do |v|
    v.memory = 1024
    v.cpus = 2
  end

  config.vm.provision :shell do |s|

    s.inline = <<-heredoc

        if ! which docker; then
          curl -sSL https://get.docker.com/ | sh
        fi

        if ! which docker-compose; then
          curl -L https://github.com/docker/compose/releases/download/1.4.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
          chmod +x /usr/local/bin/docker-compose
        fi

        if ! groups | grep docker; then
          usermod -a -G docker vagrant
        fi

        cd /var/src
        docker-compose up -d --force-recreate
        echo "done"
      heredoc
  end
end
