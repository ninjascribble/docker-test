Vagrant.configure("2") do |config|

  config.vm.box = "trusty64"
  config.vm.box_url = "http://cloud-images.ubuntu.com/vagrant/trusty/current/trusty-server-cloudimg-amd64-vagrant-disk1.box"
  config.vm.network :forwarded_port, guest: 8001, host: 8001
  config.vm.network :forwarded_port, guest: 8002, host: 8002
  config.vm.synced_folder "", "/vagrant", disabled: true
  config.vm.synced_folder "", "/var/src", owner: "www-data", group: "www-data"

  config.vm.provider :virtualbox do |v|
    v.memory = 1024
    v.cpus = 2
  end

  # config.vm.provider :docker

  config.vm.provision :docker do |d|

    d.build_image "/var/src/service1", args: "-t service1"
    d.run "service1", args: "-it -p 8001:8888"

    d.build_image "/var/src/service2", args: "-t service2"
    d.run "service2", args: "-it -p 8002:8888"
  end
end
