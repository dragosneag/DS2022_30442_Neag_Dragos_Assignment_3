FROM openjdk:17-oracle
MAINTAINER dragosneag

ENV DATABASE_URL=jdbc:mysql://mysqldb/energy-platform

COPY target/DS2022_30442_Neag_Dragos_Assignment_1-0.0.1-SNAPSHOT.jar DS2022_30442_Neag_Dragos_Assignment_1-0.0.1-SNAPSHOT.jar

ENTRYPOINT ["java","-jar","/DS2022_30442_Neag_Dragos_Assignment_1-0.0.1-SNAPSHOT.jar"]