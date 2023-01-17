# DS2022_30442_Neag_Dragos_Assignment_1

Energy Platform

An online platform should be designed and implemented to manage users, their associated smart energy metering devices, and the monitored data from each device. 

# How to install and run the application

First step is to install docker on the pc.

# Creating the containers

Start the docker platform.

Navigate to the backend folder in the command prompt and build the image like:


docker build -t energy-platform-backend .


Then navigate to the frontend folder in the command prompt and build the image like:


docker build -t energy-platform-frontend .


Then go back to the root folder of the project run the following command:


docker compose up


Wait until the mysql server will finish the initial configuration.
The backend will most likely fail due to the database linking can't be done as the mysql server is not ready in time for it.

Next, navigate to the docker desktop where we will see that the containers of the mysql server and react application are running.
We simply hit run on the backend container and it should start properly.

# Starting the application

Now navigate to (https://localhost:3000) and you should be able to interact with the app, replacing the localhost with your local IP.
