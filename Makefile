# Production image build + publish to Docker Hub (linux/amd64 only).
#
# Override the namespace/repo on the command line or via the environment:
#   make push DOCKER_NAMESPACE=myuser
#   make push IMAGE=myuser/photo-gallery TAG=latest

DOCKER_NAMESPACE ?= adoah
IMAGE_NAME       ?= photos.monomotion.org
TAG              ?= latest
IMAGE            ?= $(DOCKER_NAMESPACE)/$(IMAGE_NAME)
IMAGE_REF        := $(IMAGE):$(TAG)

PLATFORM  ?= linux/amd64
TARGET    ?= production
BUILDER   ?= photo-gallery-builder

.DEFAULT_GOAL := help

.PHONY: help
help: ## Show available targets
	@grep -hE '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) \
		| awk 'BEGIN {FS = ":.*?## "} {printf "  \033[36m%-14s\033[0m %s\n", $$1, $$2}'
	@echo
	@echo "  image: $(IMAGE_REF) ($(PLATFORM))"

.PHONY: builder
builder: ## Ensure a buildx builder capable of cross-platform builds exists
	@docker buildx inspect $(BUILDER) >/dev/null 2>&1 \
		|| docker buildx create --name $(BUILDER) --driver docker-container --bootstrap

.PHONY: build
build: builder ## Build the production image for amd64 and load it locally
	docker buildx build \
		--builder $(BUILDER) \
		--platform $(PLATFORM) \
		--target $(TARGET) \
		--tag $(IMAGE_REF) \
		--load \
		.

.PHONY: push
push: builder ## Build the production amd64 image and push it to Docker Hub
	docker buildx build \
		--builder $(BUILDER) \
		--platform $(PLATFORM) \
		--target $(TARGET) \
		--tag $(IMAGE_REF) \
		--provenance=false \
		--push \
		.

.PHONY: login
login: ## Log in to Docker Hub
	docker login

.PHONY: verify
verify: ## Confirm the pushed manifest is amd64
	docker buildx imagetools inspect $(IMAGE_REF)

.PHONY: run
run: ## Run the locally loaded production image on port 3000
	docker run --rm -p 3000:3000 $(IMAGE_REF)

.PHONY: clean
clean: ## Remove the local image tag and the buildx builder
	-docker image rm $(IMAGE_REF)
	-docker buildx rm $(BUILDER)
