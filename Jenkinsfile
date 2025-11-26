pipeline {
    agent {
        label 'buildkit'
    }
    
    environment {
        REGISTRY = 'registry.adoah.dev'
        IMAGE_PATH = 'projects/photo-gallery-node'
        FULL_IMAGE_NAME = "${REGISTRY}/${IMAGE_PATH}"
        IMAGE_TAG = ''
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
                script {
                    // Ensure we have full git history for tags
                    sh 'git fetch --tags'
                }
            }
        }
        
        stage('Prepare Version Tags') {
            steps {
                script {
                    // Get the latest git tag
                    def gitTag = sh(
                        script: 'git describe --tags --abbrev=0 2>/dev/null || echo ""',
                        returnStdout: true
                    ).trim()
                    
                    if (gitTag == '') {
                        error('No git tags found. Please create a semantic version tag (e.g., v1.0.0 or 1.0.0)')
                    }
                    
                    // Strip 'v' prefix if present to get semver
                    def semver = gitTag.startsWith('v') ? gitTag.substring(1) : gitTag
                    
                    // Get short git hash
                    def gitHash = sh(
                        script: 'git rev-parse --short HEAD',
                        returnStdout: true
                    ).trim()
                    
                    // Combine into format: semver-githash
                    IMAGE_TAG = "${semver}-${gitHash}"
                    
                    echo "Building image with tag: ${IMAGE_TAG}"
                    echo "Full image name: ${FULL_IMAGE_NAME}:${IMAGE_TAG}"
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building Docker image targeting production stage..."
                    sh """
                        docker build \
                            --target production \
                            -t ${FULL_IMAGE_NAME}:${IMAGE_TAG} \
                            .
                    """
                    echo "Successfully built ${FULL_IMAGE_NAME}:${IMAGE_TAG}"
                }
            }
        }
        
        stage('Push Image') {
            steps {
                script {
                    echo "Pushing image to registry: ${REGISTRY}"
                    sh """
                        docker push ${FULL_IMAGE_NAME}:${IMAGE_TAG}
                    """
                    echo "Successfully pushed ${FULL_IMAGE_NAME}:${IMAGE_TAG}"
                }
            }
        }
    }
    
    post {
        success {
            echo "Pipeline completed successfully!"
            echo "Image: ${FULL_IMAGE_NAME}:${IMAGE_TAG}"
        }
        failure {
            echo "Pipeline failed. Please check the logs above for details."
        }
        always {
            // Cleanup: Remove local image to save space (optional)
            script {
                sh "docker rmi ${FULL_IMAGE_NAME}:${IMAGE_TAG} || true"
            }
        }
    }
}

