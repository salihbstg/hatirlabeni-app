FROM eclipse-temurin:21-jdk

COPY user-service/target/*.jar application.jar

COPY config/application.properties /config/application.properties

ENTRYPOINT ["java","-jar","application.jar"]