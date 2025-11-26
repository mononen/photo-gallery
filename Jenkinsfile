pipeline {
    agent {
        node {
            label 'buildkit'
        }
    }
    
    environment {
        REGISTRY = 'registry.adoah.dev'
        VERSION = '1.0.0'
    }

    post {
        always {
            cleanWs(deleteDirs: true, notFailBuild: false)
        }
    }


    stages {
        stage("Build") {
            when {
                branch 'main'
            }
            failFast true
            parallel {
                stage("Build") {
                    agent { label 'buildkit' }
                    environment {
                        IMAGE = 'projects/photo-gallery-node'
                    }
                    steps {
                        container(name: 'buildkitd') {
                            sh '''
                                buildctl \
                                    --addr tcp://buildkit.adoah.dev:1234 \
                                    --tlscert /home/user/.certs/tls.crt \
                                    --tlskey /home/user/.certs/tls.key \
                                build \
                                    --frontend dockerfile.v0 \
                                    --local context=. \
                                    --local dockerfile=. \
                                    --opt target=production \
                                    --output type=image,name=${REGISTRY}/${IMAGE}:${VERSION},push=true
                            '''
                        }
                    }
                }
            }
        }
    }
}
