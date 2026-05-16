pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend & Frontend') {
            steps {
                echo 'Building containers using docker-compose...'
                bat 'docker-compose down'
                bat 'docker-compose build'
            }
        }

        stage('Run Containers') {
            steps {
                echo 'Starting containers...'
                bat 'docker-compose up -d'
            }
        }
    }

    post {
        success {
            echo '✅ Deployment successful'
        }
        failure {
            echo '❌ Pipeline failed'
        }
    }
}