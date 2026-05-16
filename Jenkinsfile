pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/maithree17/API-HealthMonitor.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t api-healthmonitor:1.0 .'
            }
        }

        stage('Run Container') {
            steps {
                bat 'docker run -d -p 5000:5000 api-healthmonitor:1.0'
            }
        }
    }
}