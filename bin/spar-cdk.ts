#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { StackProps } from "aws-cdk-lib";
import { ConfigProps, getConfig } from "../lib/config";

//AWS Stacks
import { vpcStack } from "../lib/vpc-stack";
import { rdsStack } from "../lib/rds-stack";
import { eksStack } from "../lib/eks-stack";
import { helmStack } from "../lib/helm-stack";

const config = getConfig();
const app = new cdk.App();

type AwsEnvStackProps = StackProps & {
  config: ConfigProps;
};

const MY_AWS_ENV_STACK_PROPS: AwsEnvStackProps = {
  env: {
    region: config.REGION,
    account: config.ACCOUNT,
  },
  config: config,
};

// Provision required VPC network & subnets
const infra = new vpcStack(app, "vpcstack", MY_AWS_ENV_STACK_PROPS);

// Provision target RDS data store
const rds = new rdsStack(app, "rdsstack", {
  env: {
    region: config.REGION,
    account: config.ACCOUNT,
  },
  config: config,
  vpc: infra.vpc,
  rdsuser: config.RDS_USER,
  rdspassword: config.RDS_PASSWORD,
});

// Provision target EKS with Fargate Cluster within the VPC
const eksCluster = new eksStack(app, "eksstack", {
  env: {
    region: config.REGION,
    account: config.ACCOUNT,
  },
  config: config,
  vpc: infra.vpc,
});

// Run HELM charts for the SPAR applications in the provisioned EKS cluster
new helmStack(app, "helmstack", {
  env: {
    region: config.REGION,
    account: config.ACCOUNT,
  },
  config: config,
  vpc: infra.vpc,
  rdssecret: rds.rdsSecret,
  rdsHost: rds.rdsHost,
  RDS_PASSWORD: config.RDS_PASSWORD,
  RDS_USER: config.RDS_USER,
  eksCluster: eksCluster.eksCluster,
  SPAR_CORE_AUTH_DEFAULT_ISSUERS: config.SPAR_CORE_AUTH_DEFAULT_ISSUERS,
  SPAR_CORE_AUTH_DEFAULT_JWKS_URLS: config.SPAR_CORE_AUTH_DEFAULT_JWKS_URLS

});


