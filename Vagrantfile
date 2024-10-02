# -*- mode: ruby -*-
# vi: set ft=ruby :

#UI object for printing infomation
# methode: info - warn - error - success
UIMSG = Vagrant::UI::Prefixed.new(Vagrant::UI::Colored.new, "vagrant")
UIMSG.info("VAGRANT_GUEST " + RbConfig::CONFIG['host_os'])

# SOURCE
case RbConfig::CONFIG['host_os']
when /linux/
  PATH_HOME = "/mnt/c/HashiCorp/vagrant"
when /mingw32/
  PATH_HOME = "C:/Users/administrateur/Desktop/HashiCorp/Vagrant"
else
  PATH_HOME = ""
end # End Source

SCRIPT_HOME = PATH_HOME + "/scripts"

#Var VM
VM_PROVIDER = "virtualbox"
VM_LNX_BOX  = "generic/debian12"
VM_WIN_BOX  = "gusztavvargadr/windows-10"

VM_DISKSIZE = "120GB"
VM_SSH      = 2520
VM_TIMEOUT  = 600

HOSTS = {
  "inplnx"    => { :box => "#{VM_LNX_BOX}", :ip => "192.168.56.10", :cpu => 2, :mem => 2048 },
}

Vagrant.configure("2") do |config|
  HOSTS.each_with_index do |(host,info),index|
    config.vm.provider "virtualbox" do |vm|
      vm.memory                    = info[:mem]
      vm.cpus                      = info[:cpu]
    end # End Provider

    config.vm.define host do |hostconf|
      hostconf.vm.box              = info[:box]
      hostconf.vm.hostname         = host
      hostconf.vm.network          :private_network, ip: info[:ip]

      config.vm.provision "shell", inline: <<-SHELL
      sudo apt-get update
      sudo apt-get install -y
      SHELL
    end # End Define
  end # End HOSTS
end # End Config