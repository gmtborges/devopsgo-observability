# DevOpsGO - Hands-On Observabilidade

# Provisionamento do ambiente sandbox K8s

- 1 Control Plane
- 3 Nodes

## Ferramentas

- [Vagrant](https://developer.hashicorp.com/vagrant)
  - MacOS: VMWare Fusion
  - Linux: VirtualBox
- [K3s](https://k3s.io)

## Criar o cluster

Provisionar as 3 VM's

`cd vagrant && vagrant up`

Configurar o Control Plane

`vagrant ssh controlplane`

`curl -sfL https://get.k3s.io | sh -s - --write-kubeconfig-mode 644`

Teste

`kubectl get nodes`

Salve o token para configurar os nodes

`sudo cat /var/lib/rancher/k3s/server/node-token`

Salve o IP da interface eth0

`ip addr show dev eth0`

`exit`

Configurar os nodes

`vagrant ssh node1`

`K3S_TOKEN=my-controlplane-token`

`K3S_IP=my-controlplane-eth0`

`curl -sfL https://get.k3s.io | K3S_URL=https://$K3S_IP:6443 K3S_TOKEN=$K3S_TOKEN sh -`

Repetir para o node2 e node3

## Configurar ~/.kube/config

`vagrant ssh controlplane`

Copie o conteúdo do arquivo k3s.yaml:

`cat /etc/rancher/k3s/k3s.yaml`

`exit`

Adicione em seu `~/.kube/config` local e altere o nome do context para `k3s`. Se
ainda não tiver instalado, siga o link
[https://kubernetes.io/docs/tasks/tools/#kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl)

Teste usando seu kubectl local

`kubectl config use-context k3s`

`kubectl get nodes`

# Configurando a stack de Observabilidade

## [https://min.io](https:min.io)

`kubectl create namespace monitoring`

`kubectl config set-context --current --namespace=monitoring`

`cd maniefsts/minio`

`helm repo add minio https://operator.min.io/`

[https://min.io/docs/minio/kubernetes/upstream/operations/install-deploy-manage/deploy-operator-helm.html](https://min.io/docs/minio/kubernetes/upstream/operations/install-deploy-manage/deploy-operator-helm.html)

`helm upgrade --install minio-operador minio/operator -f operator-values.yaml`

[https://min.io/docs/minio/kubernetes/upstream/operations/install-deploy-manage/deploy-minio-tenant-helm.html#deploy-tenant-helm](https://min.io/docs/minio/kubernetes/upstream/operations/install-deploy-manage/deploy-minio-tenant-helm.html#deploy-tenant-helm)

`helm upgrade --install minio-tenant minio/tenant -f tenant-values.yaml`

Opcional, mc CLI

[https://min.io/docs/minio/linux/reference/minio-mc.html#minio-client](https://min.io/docs/minio/linux/reference/minio-mc.html#minio-client)

## Loki

[https://grafana.com/docs/loki/latest/setup/install/helm/install-scalable/](https://grafana.com/docs/loki/latest/setup/install/helm/install-scalable/)

`cd maniefsts/loki`

`helm repo add grafana https://grafana.github.io/helm-charts`

`helm upgrade --install loki grafana/loki -f values.yaml`

## Promtail

`helm upgrade --install promtail grafana/promtail`

## Tempo

`cd maniefsts/tempo`

`helm upgrade --install tempo grafana/tempo-distributed -f values.yaml`

## Open Telemetry

## Ops

`helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts`

`cd maniefsts/otel-collector`

`helm upgrade --install otelcol open-telemetry/opentelemetry-collector -f values.yaml`

### Dev
