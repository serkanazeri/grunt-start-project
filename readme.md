**Grunt Start Project**
=======================

Projelerimizde rutin olarak yapmamız gereken işleri grunt ile otomatize ederek hızlı bir şekilde çalışmamızı sağlar.

**Kurulum**
-----------
Projemizde Grunt kullanabilmek için öncelikle [node.js](http://nodejs.org) kurulumu yapmamız gerekmektedir.

Node kurulumunu yaptıktan sonra Grunt kurulumu için terminale aşağıdaki komutları yazmamız gerekmektedir.

    npm install -g grunt-cli

Grunt kurulumunu yaptıktan sonra node modülerimizi yüklememiz gerekmektedir.

    npm install

**Kullanım**
-------
Node ve Grunt kurulumunu yaptık node modüllerimizi yükledik artık projemizi çalıştırabiliriz.

Projede dev ve live olmak üzere iki tane register task bulunmaktadır.

Projemizi geliştirirken dev taskını kullanacağız.

    grunt dev

Projemiz yayına hazır hale geldiğinde live taskını kullanacağız.

    grunt live

