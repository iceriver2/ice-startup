# WARNING! ONLY FOR UBUNTU 14.04 trusty 64bit.
# Install apache2/php5, tomcat9/java13, node12, mysql8, postgresql12, mongodb4, redis5

if [ $(whoami) != "root" ]; then
echo "Error! Please log in as root."
exit
fi

echo ""
echo "|===========================|"
echo "|      Env Installation     |"
echo "|===========================|"
echo ""

cd /root

echo "==========================="
echo "update apt source..."
aptfile="/etc/apt/sources.list"
cp $aptfile "$aptfile.original"
echo "" > $aptfile
echo "deb http://mirrors.aliyun.com/ubuntu/ trusty main restricted universe multiverse" >> $aptfile
echo "deb http://mirrors.aliyun.com/ubuntu/ trusty-security main restricted universe multiverse" >> $aptfile
echo "deb http://mirrors.aliyun.com/ubuntu/ trusty-updates main restricted universe multiverse" >> $aptfile
echo "deb http://mirrors.aliyun.com/ubuntu/ trusty-proposed main restricted universe multiverse" >> $aptfile
echo "deb http://mirrors.aliyun.com/ubuntu/ trusty-backports main restricted universe multiverse" >> $aptfile
echo "deb-src http://mirrors.aliyun.com/ubuntu/ trusty main restricted universe multiverse" >> $aptfile
echo "deb-src http://mirrors.aliyun.com/ubuntu/ trusty-security main restricted universe multiverse" >> $aptfile
echo "deb-src http://mirrors.aliyun.com/ubuntu/ trusty-updates main restricted universe multiverse" >> $aptfile
echo "deb-src http://mirrors.aliyun.com/ubuntu/ trusty-proposed main restricted universe multiverse" >> $aptfile
echo "deb-src http://mirrors.aliyun.com/ubuntu/ trusty-backports main restricted universe multiverse" >> $aptfile
apt update
echo "...done"
echo ""

echo "==========================="
echo "install basic tools..."
apt install -y build-essential git curl wget
echo "...done"
echo ""


log="installation.log"
echo "" > $log


echo "==========================="
echo "install mysql5.5.62..."
apt install -y mysql-server mysql-client # user:root password:root
echo "mysql v5.5.62 installed" >> $log
echo "...done"
echo ""

echo "==========================="
echo "install redis2.8.4..."
apt install -y redis-server redis-tools
echo "redis v2.8.4 installed" >> $log
echo "...done"
echo ""

echo "==========================="
echo "install apache2.4.7..."
apt install -y apache2 libapache2-mod-fastcgi libapache2-mod-php5
echo "apache v2.4.7 installed" >> $log
echo "...done"
echo ""

echo "==========================="
echo "install php5.5.9..."
apt install -y php5 php5-adodb php5-cgi php5-cli php5-common php5-curl php5-exactimage php5-fpm php5-gd php5-geoip php5-json php5-mongo php5-mysql php5-pgsql php5-redis
echo "php v5.5.9 installed" >> $log
echo "...done"
echo ""

echo "==========================="
echo "install mongodb2.4.9..."
apt install -y mongodb mongodb-clients mongodb-server
echo "mongodb v2.4.9 installed" >> $log
echo "...done"
echo ""

echo "==========================="
echo "install postgresql9.3..."
apt install -y postgresql postgresql-contrib
echo "postgresql v9.3 installed" >> $log
echo "...done"
echo ""

echo "==========================="
echo "install node..."
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
source $HOME/.bashrc
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
nvm install node
echo "node `node -v` installed" >> $log
echo "...done"
echo ""

echo "==========================="
echo "install jdk7..."
apt install -y openjdk-7-jdk
echo "jdk v1.7.0 installed" >> $log
echo "...done"
echo ""

echo "==========================="
echo "install tomcat7..."
apt install -y tomcat7
echo "tomcat 7 installed" >> $log
echo "...done"
echo ""

echo "" >> $log
echo "" >> $log

echo "==========================="
echo "create phpinfo..."
phpfile="phpinfo.php"
phpdir="/var/www/html"
echo "<?php phpinfo();" > "$phpdir/$phpfile"
echo "apache root is $phpdir" >> $log
echo "visit http://localhost/$phpfile for apache" >> $log
echo ""
javadir="/var/lib/tomcat7/webapps"
echo "tomcat root is $javadir" >> $log
echo "visit http://localhost:8080/ for tomcat" >> $log
echo "...done"
echo ""

echo "==========================="
echo "reset postgres's password..."
passwd -d postgres
sudo -u postgres passwd
echo "...done"
echo ""

echo "==========================="
echo "create connections in /root/"
connmysql="/root/connect-mysql.sh"
connredis="/root/connect-redis.sh"
connmongo="/root/connect-mongo.sh"
connpsql="/root/connect-postgres.sh"
echo "mysql -uroot -p" > $connmysql
chmod +x $connmysql
echo "redis-cli" > $connredis
chmod +x $connredis
echo "mongo" > $connmongo
chmod +x $connmongo
echo "sudo -u postgres psql" >> $connpsql
chmod +x $connpsql
echo "" >> $log
echo "/root/connect-xxx.sh created" >> $log
echo "...done"
echo ""

echo "==========================="

echo ""
echo ""
echo "|===========================|"
echo "|        Enjoying  it       |"
echo "|===========================|"
echo ""