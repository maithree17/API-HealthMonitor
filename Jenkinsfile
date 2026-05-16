pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git 'https://github.com/maithree17/API-HealthMonitor.git'
            }
        }

        stage('Build & Run with Docker Compose') {
            steps {
                bat 'docker-compose down'
                bat 'docker-compose build'
                bat 'docker-compose up -d'
            }
        }
    }
}