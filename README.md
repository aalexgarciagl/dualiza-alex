


### Despliegue del cliente

Para instalar las dependencias del proyecto, utiliza el siguiente comando:

```bash
npm install
```
Este comando utiliza npm (Node Package Manager) para instalar todas las dependencias especificadas en el archivo package.json

Utilizaremos el siguiente comando para abrir nuestra pagina web. 

```bash
npm run s
```
Nuestra pagina no funcionara hasta que no encendamos el servidor. 
A continuacion le mostramos como. 


### Despliegue del servidor

Lo primero que deberemos hacer dentro de la carpeta **service** es utilizar el comando: 
```bash
composer update
```

Una vez lanzado este comando, nos iremos al archivo .env.example y haremos una copia en la misma ubicacion donde esta este, pero le cambiaremos el nombre a .env.
Dentro de este archivo tendremos que tocar algunos campos:
```bash
DB_DATABASE=dualiza
DB_USERNAME=tu usuario de MySql
DB_PASSWORD=tu password de MySql

MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=dualiza96@gmail.com
MAIL_PASSWORD=qopcwkoiclxywkqe
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="dualiza96@gmail.com"
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=AKIA4HPMYTDJ3ILXJ657
AWS_SECRET_ACCESS_KEY=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
AWS_DEFAULT_REGION=eu-north-1
AWS_BUCKET=dualiza-bucket
AWS_USE_PATH_STYLE_ENDPOINT=false
```

Copia y sustituye los siguentes campos dentro de tu archivo .env.
Una vez realizado, deberas lanzar el siguiente comando: 
```bash
php artisan key:generate
```

Esto nos generara una clave de laravel que necesitaremos por motivos de seguridad. 

Una vez utilizado este comando, continuaremos con la instalacion de la base de datos. 
Bastara con utilizar el comando: 
```bash
php artisan migrate --seed
```
Recordad que deberemos tener lanzados el servidor Apache y el MySql desde el **xampp** para que este comando surga efecto.
Nos dira que la base de datos no esta creada si esta no lo esta, y nos preguntara si deseamos crearla, le indicaremos que si y comenzara el proceso.

Una vez migrada la base de datos, procedemos a inciar el servidor con el siguente comando: 
```bash
php artisan serve
```

Una vez lancemos el comando, nuestro servidor se iniciara y podremos utilizar nuestra pagina web.