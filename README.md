# AngularAuth

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


Deploying an Angular app on an Apache server running on a Linux system involves a few steps. Here's a step-by-step guide to help you through the process:

1. **Build Your Angular App**:

   Navigate to your Angular app's root directory in the terminal and build the production version of your app using the Angular CLI:
   
   ```bash
   ng build --prod
   ```

   This will create a `dist/` directory containing the compiled and optimized files for deployment.

2. **Install and Configure Apache**:

   If Apache isn't already installed, you can install it using the package manager for your Linux distribution. For example, on Ubuntu, you can use:
   
   ```bash
   sudo apt-get update
   sudo apt-get install apache2
   ```

   Once installed, you might need to start and enable Apache:

   ```bash
   sudo systemctl start apache2
   sudo systemctl enable apache2
   ```

3. **Copy Files to Apache's Web Root**:

   Copy the contents of the `dist/` directory (the output of the Angular build) to Apache's web root directory. This is usually `/var/www/html/` on many Linux distributions. You might need root privileges to copy files to this directory:

   ```bash
   sudo cp -r dist/* /var/www/html/
   ```

4. **Configure Apache for Your App**:

   Create or edit an Apache configuration file for your app. You can create a new file in the `/etc/apache2/sites-available/` directory with a `.conf` extension, e.g., `my-angular-app.conf`. Use a text editor to edit the file:

   ```bash
   sudo nano /etc/apache2/sites-available/my-angular-app.conf
   ```

   Add the following configuration (modify it according to your app's specifics):

   ```apache
   <VirtualHost *:80>
       ServerName your-domain-or-ip
       DocumentRoot /var/www/html/

       <Directory /var/www/html/>
           Options Indexes FollowSymLinks
           AllowOverride All
           Require all granted
       </Directory>

       ErrorLog ${APACHE_LOG_DIR}/error.log
       CustomLog ${APACHE_LOG_DIR}/access.log combined
   </VirtualHost>
   ```

   Save the file and exit the text editor.

5. **Enable the Configuration and Restart Apache**:

   Enable the new site configuration and reload Apache:

   ```bash
   sudo a2ensite my-angular-app
   sudo systemctl reload apache2
   ```

6. **Set Up Domain or IP**:

   If you're using a domain name, ensure it's correctly configured to point to your server's IP address. If you're using an IP address, you can access your app using that IP.

7. **Access Your Angular App**:

   Open a web browser and navigate to your server's domain or IP address. You should see your Angular app running on the Apache server.

Remember to secure your server, configure SSL if necessary, and follow best practices for server administration. This guide provides a basic outline of the process, and you may need to adjust it based on your specific server and application setup.