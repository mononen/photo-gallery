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
                                    --output type=image,name=${REGISTRY}/${IMAGE}:${env.BRANCH}-${VERSION},push=true
                            '''
                        }
                    }
                }
            }
        }
        stage("Development") {
            agent { label 'helm-deploy'}
            when {
                branch 'dev'
            }
            steps {
                container(name: 'helm') {
                    sh 'helm upgrade --install photo-gallery .ci/chart --namespace development -f .ci/config/dev.yaml --version ${VERSION} --set image.tag=${env.BRANCH}-${VERSION}'
                }
            }
        }
        stage("Production") {
            agent { label 'helm-deploy'}
            when {
                branch 'master'
            }
            steps {
                container(name: 'helm') {
                    sh 'helm upgrade --install photo-gallery .ci/chart --namespace production -f .ci/config/prd.yaml --version ${VERSION} --set image.tag=${VERSION}'
                }
            }
        }

    }
}
