## AWS CDK One Click Deployment ##

## Prerequisties:
To get started with CDK, it's easier to set up an AWS Cloud9 environment, which provides you with a code editor and a terminal that runs in a web browser. Using IDE like AWS Cloud9 is optional but highly recommended, as it expedites the process. Alternatively, you can also configure AWS CLI in your local environment or on a remote server of your choice.

### Prepare your environment
```
# Install TypeScript globally for CDK
npm i -g typescript

# Install aws cdk
npm i -g aws-cdk

# Clone the repository 
git clone https://git-codecommit.ap-south-1.amazonaws.com/v1/repos/spar-aws-automation
cd spar-aws-automation

# Install the CDK application
npm i

# cdk bootstrap [aws://ACCOUNT-NUMBER-1/REGION-1]
cdk bootstrap aws://ACCOUNT-NUMBER-1/REGION-1
```

### CDK Stack list
The CDK comprises stacks designed to perform unique provisioning steps, making the overall automation modular.

    vpcStack, rdsStack, eksStack,  helmStack

### CDK Stack Overview
Here is an overview of all the stacks along with the actions they perform:

    bin/spar-cdk.ts - Is the entrypoint of the CDK application.
    config.ts       -  Input file for CDK Deployment including defaults ( AWS Account Number, Region etc., )
    vpc-stack.ts    -  Foundation stack creation including VPC, Subnets, Route tables, NatGW etc.,
    rds-stack.ts    - Creates RDS Aurora Postgresql cluster
    eks-stack.ts    - To create EKS Fargate Cluster
    helm-stack.ts   - To deploy SPAR helm chart


#### Update mandatory environment variables, with your preferred editor open '.env' file

   | Secret Key                                     | Description   | 
   | ---------------------------------------------  | ------- | 
   | REGION                 | Target AWS region code  | 
   | ACCOUNT                | AWS account code  | 
   | CIDR                   | VPC CIDR, change it as per your environment  | 
   | MAX_AZS                | AWS Availability Zone count, default 2  |
   | RDS_USER               | Database user name for core registory service, default 'postgres'  |
   | RDS_PASSWORD           | Database password, used while DB creation and passed down to SPAR services helm chart  |
   | SPAR_CORE_AUTH_DEFAULT_ISSUERS          |  eSignet Authentication Issuer URL |                    |
   | SPAR_CORE_AUTH_DEFAULT_JWKS_URLS        |  eSignet JWKS URL                    |
  
   
**Deploy CDK**
```
# After updating the env file, run AWS CDK commands to begin with deploy

# emits the synthesized CloudFormation template
cdk synth 

# List CDK stack
cdk list

# Deploy single stack. Ensure order is maintained - vpcStack, rdsStack, eksStack, helmStack
cdk deploy <stack_name>

# Alternatively you could also deploy all stacks and CDK would handle the sequence
cdk deploy --all 
```
**TBC include list of pods/image versions to be in running state in a table **

** includ basic kubectl commands for listing pod status along with the output from dev Step ""

After installing all the CDK stacks, verify the AWS services in the AWS web console. The stack 'helmStack' installs the SPAR helm chart and all associated services in the EKS cluster. It is recommended to review the [Deployment through Helm](02-Deployment-Helm-Spar.md) guide to become familiar with Helm charts, services, and parameters. This will be beneficial if you opt to run the Helm chart separately from the CDK, following the "Mode Two: Direct Helm Chart Invocation" approach for installing the Sunbird RC stack.

Follow the post installation steps to start using Sunbird RC services

* [Post Installation Procedure](03-Post-Installation-Procedure.md)

**Lastly, if you wish to clean up, run 'AWS CDK destroy' to remove all AWS resources that were created by it.**
```
cdk destroy [STACKS..]
```