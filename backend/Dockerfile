FROM maven:3.8.5-openjdk-17

WORKDIR /backend
COPY . .
RUN mvn clean package

EXPOSE 8080

CMD mvn spring-boot:run