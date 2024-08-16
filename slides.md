---
author: Gustavo Martins T Borges
title: "Meetup DevOpsGO"
subtitle: "Hands-on Observabilidade"
date: 17 de Agosto, 2024.
theme: white
header-includes: |
  <style>
  .author {
      font-size: 0.75em;
  }

  .date {
      font-size: 0.75em;
  }

  .reveal h1 {
      font-size: 1.9em;
      text-transform: none;
  }

  .reveal h2 {
      font-size: 1.4em;
      text-transform: none;
  }

  .reveal h3 {
      font-size: 1em;
      text-transform: none;
  }

  .reveal p {
      font-size: 0.7em;
  }

  .reveal .subtitle {
      font-size: 1.3em;
      font-weight: 600;
  }

  li {
     font-size: 0.7em;
  }

  .reveal ul {
     display: block;
  }

  #contatos p {
    display: block;
  }
  </style>
---

# `whoami`

- Graduado em Engenharia de Software (UFG);
- Atuo no mercado de TI há mais de 13 anos, passando por _statups_ a _big
  techs_;
- Tenho experiência em práticas que contribuem desde o _design_ do código até a
  operação.
- Consultor independente em DevOps e Arquitetura de soluções.

#

![](./fullstack-devops.webp){ width=40% }

# Agenda

- Conceitos
- Provisionar ambiente
- Prática

# Observabilidade

### Tracings, Métricas e Logs.

#

<h1>Monitoramento<br /> x <br /> Observabilidade<h1>

# Tracings

Troubleshooting

# Métricas

Estratégia, a base para o SRE.

#

## As métricas são para melhorar a experiência do seu usuário!

# Logs

Troubleshooting

# Open Telemetry

### Convenção na instrumentação, coleta e exportação de telemetria.

# Dev

### SDK, Instrumentação

# Ops

### Otel Collector. Receivers e Exporters

# Prometheus

### Banco de Dados de métricas

# Loki

### Banco de Dados de logs

Agente coletor: Promtail, Fluentbit, Otel Collector...

# Tempo

### Banco de Dados de tracings

# AlertManager

Se um alerta não dispara um ação imediata ou um ticket para análise,
provavelmente é um alerta mal configurado.

# Provisonamento do ambiente

[https://github.com/gmtborges/devopsgo-observability](https://github.com/gmtborges/devopsgo-observability){target="\_blank"}

# Prática

#

## Configurando a persistência

- Storage Class
- Minio

#

## Storage Class

Provisionamento dinâmico de volumes a partir da criação de um
PersistentVolumeClaim.

Setando o storage class default

`storageclass.kubernetes.io/is-default-class: "true"`

#

AWS EBS-CSI-Driver

[https://github.com/kubernetes-sigs/aws-ebs-csi-driver/blob/master/docs/install.md](https://github.com/kubernetes-sigs/aws-ebs-csi-driver/blob/master/docs/install.md){target="\_blank"}

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: ebs-sc
  annotations:
    storageclass.kubernetes.io/is-default-class: "true"
provisioner: ebs.csi.aws.com
volumeBindingMode: WaitForFirstConsumer
parameters:
  type: gp3
```

#

Nodes com storage distribuído.

[https://github.com/longhorn/longhorn](https://github.com/longhorn/longhorn){target="\_blank"}

#

## Minio

[https://min.io](https://min.io){target="\_blank"}

Object Storage Self Hosted.

#

## Configurando logs, métricas e tracings

#

## Loki

[https://grafana.com/docs/loki/latest/setup/install/helm/install-scalable/](https://grafana.com/docs/loki/latest/setup/install/helm/install-scalable/){target="\_blank"}

#

## Promtail

[https://grafana.com/docs/loki/latest/send-data/promtail/installation/#install-using-helm](https://grafana.com/docs/loki/latest/send-data/promtail/installation/#install-using-helm){target="\_blank"}

#

## Tempo

[https://grafana.com/docs/helm-charts/tempo-distributed/next/get-started-helm-charts/#install-grafana-tempo-using-the-helm-chart](https://grafana.com/docs/helm-charts/tempo-distributed/next/get-started-helm-charts/#install-grafana-tempo-using-the-helm-chart){target="\_blank"}

#

## kube-prometheus-stack

[https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack](https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack){target="\_blank"}

Facilita a instalação do prometheus, prometheus-operator e Grafana.

# Open Telemetry

#

## Ops

[https://opentelemetry.io/docs/collector/](https://opentelemetry.io/docs/collector/){target="\_blank"}

[https://github.com/open-telemetry/opentelemetry-helm-charts/tree/main/charts/opentelemetry-collector](https://github.com/open-telemetry/opentelemetry-helm-charts/tree/main/charts/opentelemetry-collector){target="\_blank"}

Otel Collector

#

## Dev

SDK

[https://opentelemetry.io/docs/languages/](https://opentelemetry.io/docs/languages/){target="\_blank"}

#

## Dev

Instrumentação

[https://opentelemetry.io/ecosystem/registry/?language=js&component=instrumentation](https://opentelemetry.io/ecosystem/registry/?language=js&component=instrumentation){target="\_blank"}

#

## Dev

2 variáveis de ambiente

- `OTEL_SERVICE_NAME`
- `OTEL_EXPORTER_OTLP_ENDPOINT`

#

## Open Telemetry Demo

#

## Dashboards e alertas

Aprenda aos poucos promQL e faça seus próprios dashboards e alertas. Lembre-se
de criar métricas para o seu usuário final.

[https://prometheus.io/docs/prometheus/latest/querying/basics/](https://prometheus.io/docs/prometheus/latest/querying/basics/){target="\_blank"}

#

### Quer configurar observabilidade em sua empresa e melhorar a estabilidade de suas aplicações?

Entre em contato:

[linkedin.com/in/gmtborges](https://linkedin.com/in/gmtborges)

+55 62 9 9604-3560
