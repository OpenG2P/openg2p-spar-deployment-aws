import * as dotenv from "dotenv";
import path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

export type ConfigProps = {
  REGION: string;
  ACCOUNT: string;
  CIDR: string;
  MAX_AZS: number;
  CHART: string;
  REPOSITORY: string;
  NAMESPACE: string;
  RELEASE: string;
  RDS_USER: string;
  RDS_PASSWORD: string;
  RDS_SEC_GRP_INGRESS: string;
  ROLE_ARN: string;
  EKS_CLUSTER_NAME: string;
  SPAR_CORE_AUTH_DEFAULT_ISSUERS: string;
  SPAR_CORE_AUTH_DEFAULT_JWKS_URLS: string;
};

// configuration values 
export const getConfig = (): ConfigProps => ({
  REGION: process.env.REGION || "ap-south-1",
  ACCOUNT: process.env.ACCOUNT || "",
  CIDR: process.env.CIDR || "",
  MAX_AZS: Number(process.env.MAZ_AZs) || 2,
  CHART: "social-payments-account-registry",
  REPOSITORY: "https://venkates67.github.io/spar-aws/",
  NAMESPACE: "spar",
  RELEASE: "spar",
  RDS_USER: process.env.RDS_USER || "sparuser",
  RDS_PASSWORD: process.env.RDS_PASSWORD || "",
  RDS_SEC_GRP_INGRESS: process.env.CIDR || "",
  ROLE_ARN: process.env.ROLE_ARN || "",
  EKS_CLUSTER_NAME: process.env.EKS_CLUSTER_NAME || "ekscluster-demoapr",
  SPAR_CORE_AUTH_DEFAULT_ISSUERS: process.env.SPAR_CORE_AUTH_DEFAULT_ISSUERS || "",
  SPAR_CORE_AUTH_DEFAULT_JWKS_URLS: process.env.SPAR_CORE_AUTH_DEFAULT_JWKS_URLS || ""
});