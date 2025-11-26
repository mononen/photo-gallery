pipeline {
    agent {
        node {
            label 'buildkit'
        }
    }
    
    environment {
        REGISTRY = 'registry.adoah.dev'
        VERSION = "${BUILD_NUMBER}"
    }

    post {
        always {
            cleanWs(deleteDirs: true, notFailBuild: false)
        }
    }


    stages {
        stage("Build") {
            when {
                branch 'master'
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
                                    --tlscert /root/.certs/tls.crt \
                                    --tlskey /root/.certs/tls.key \
                                    --tlscacert /root/.ca/ca.pem \
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
        stage("Development") {
            agent { label 'helm-deploy'}
            when {
                branch 'master'
            }
            steps {
                sh 'helm upgrade --install photo-gallery .ci/chart --namespace development'
            }
        }
    }
}
