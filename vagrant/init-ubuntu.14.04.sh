# WARNING! ONLY FOR UBUNTU 14.04 trusty 64bit.
# Install apache2/php7, tomcat9/java13, node12, mysql8, postgresql12, mongodb4, redis5

echo "log in as root..."
su - root

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

echo "install basic tools..."
apt install -y build-essential git
echo "...done"


