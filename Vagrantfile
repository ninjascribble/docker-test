Vagrant.configure("2") do |config|

  config.vm.box = "trusty64"
  config.vm.box_url = "http://cloud-images.ubuntu.com/vagrant/trusty/current/trusty-server-cloudimg-amd64-vagrant-disk1.box"
  config.vm.network :forwarded_port, guest: 8888, host: 8888
  config.vm.synced_folder "", "/vagrant", disabled: true
  config.vm.synced_folder "", "/var/src", owner: "www-data", group: "www-data"

  config.vm.provider :virtualbox do |v|
    v.memory = 1024
    v.cpus = 2
  end

  config.vm.provision :docker do |d|

    d.build_image "/var/src",
      args: "-t docker-test"

    d.run "docker-test",
      args: "-it -p 8888:8888"
  end
end
