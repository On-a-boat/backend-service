pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'npm install'
      }
    }

    stage('unit test') {
      steps {
        sh 'npm test'
      }
    }

    stage('component test') {
      steps {
        sh 'npm test'
      }
    }

    stage('deploy') {
      steps {
        echo 'hello'
      }
    }

  }
  tools {
    nodejs 'npm'
  }
}