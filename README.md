# Express Design System Boilerplate

## React Client + React Admin + Gateway Server + API Server + Style Server

![Architecture](https://user-images.githubusercontent.com/20429356/158008003-23315066-bca4-402c-af4e-10d81a886ec7.png)

## Idea

#### Theme = It can have multiple styles, and it is given to the Client through Style.isActive management.

#### Style = An object that combines multiple layouts and components

#### Layout = It has CSS that acts as the top wrapper of the client.

#### Component = These are the component CSS objects that each theme should have.

## Client Repository

https://github.com/awakelife93/react-boilerplate

## Admin Repository

https://github.com/awakelife93/react-admin-boilerplate

## Gateway Server Repository

https://github.com/awakelife93/spring-boot-api-gateway

## API Server Repository

https://github.com/awakelife93/express-boilerplate

## [Note]

### Description

```
1. Controller / Model / Service Layer
2. Common preprocessing and data checking is handled by middleware. (src/lib/middleware)
3. This project did not create a separate Dto.
4. All elements included in the design system indicate which theme they were made for by promising "\_\_" as a delimiter depending on the theme.
5. The default environment for build and code level is the localhost environment.
```

## Author

```
2021.07.01
Author: Hyunwoo Park
```

## Getting Started

```
1. yarn install
2. yarn start
3. If you run it with docker-compose Please check each container environment.
  3-1. docker-compose.app.yml = Create and run only nodejs(express) container.
  3-2. docker-compose.full.system.yml = Create and run each container for mongo, and nodejs(express)
  3-3. Docker environment variables are managed and used in src/config.
```

#
### Thanks To JetBrains
![Thanks To JetBrains](https://user-images.githubusercontent.com/20429356/156112274-1e0d4de3-b62d-4a67-989b-dadb52a2ff3f.png)
![JetBrains Logo (Main) logo](https://resources.jetbrains.com/storage/products/company/brand/logos/jb_beam.png)
