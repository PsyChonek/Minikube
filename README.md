# Readme

## Links

- [Minikube](https://minikube.sigs.k8s.io/docs/)

## Guide

### Install

#### Minikube

<https://minikube.sigs.k8s.io/docs/start/>

    minikube start

    #Multiple nodes
    minikube start --nodes 2 -p multinode-demo

### Local Images

<https://minikube.sigs.k8s.io/docs/handbook/pushing/#1-pushing-directly-to-the-in-cluster-docker-daemon-docker-env>

### Create Deployment

    kubectl create deployment web --image=danvazy/minikube_web:latest
    kubectl expose deployment web --type=NodePort --port=8080

#### Remove Deployment

    kubectl delete deployment web
    kubectl delete service web

### Expose Service

    kubectl expose deployment web --type=NodePort --port=8080

#### Remove Service

    kubectl delete service web

### Tunnel service

    minikube service web

### Autoscale

    minikube addons enable metrics-server
    kubectl autoscale deployment worker --min=1 --max=30 --cpu-percent=10

### LoadBalancer

    kubectl expose deployment web --type=LoadBalancer --port=8080

    minikube tunnel

### Dashboard

    minikube dashboard

### YAML

    kubectl apply -f deployment.yaml

## Kubernetes

    Kubernetes Cluster
    |
    |-- Control Plane
    |   |
    |   |-- API Server
    |   |-- etcd
    |   |-- Scheduler
    |   |-- Controller Manager
    |
    |-- Worker Nodes (Nodes)
    |   |
    |   |-- Pods
    |   |   |
    |   |   |-- Containers
    |
    |-- Deployments

### Images

<div style="display: flex; flex-direction: row; justify-content: space-around; align-items: center; height:400px">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Kubernetes.png/800px-Kubernetes.png" height="100%" >
    <img src="https://images.viblo.asia/7fbb666e-422a-45d5-8ea5-41a9363cb8db.png" height="100%">
</div>

### Chytáky

- Je potřeba u API nastatvit keepAlive tak aby se připojení hned zahodilo při dalším požadavku, a loadbalancer použil jiní server.
