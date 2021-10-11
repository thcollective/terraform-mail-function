# serverless-function

## Tutorial: Deploy a new serverless Function
https://user-images.githubusercontent.com/12984614/133554939-b53d061d-5e0b-4b3a-a125-2f8adb8e195a.mp4


## IMPORTANT
1) The name of the folder needs to be unique
2) name of the function should follow EXACTLY the name of the folder
3) only edit ONE folder at a time
4) MUST change the main.tf state prefix to match the name of ur folder (VERY VERY IMPORTANT)(But if by any chance u missed this out, the script will automatically exit with code 1. So is not really the end of the world)
```

terraform {
  backend "gcs" {
    bucket  = "test-bucket-terraform146"
    prefix  = "terraform/state/<nameoffolder>"
  }
}

```

## How to trigger the creation of function
1) Create a new branch, add a new folder that contains the code of the function u want to deploy (follow the example of the test folder, as folder structure)
2) Raise a PR, and the action will run which automatically deploys the function


## List of runtimes available

nodejs16 (preview) 
nodejs14 (recommended)
nodejs12
nodejs10
python39
python38
python37
go113 (recommended)
go111
java11
dotnet3
ruby27
ruby26
php74

## How to include a new environmental variable
1) in the .github/workflows file, under the following code. Include TF_VAR_<varname>: ${{secrets.varname}} substitute the varname with the github secrets variable name. 
```
 - name: Run terraform
        run : |-
          cd ${{env.test}}
          terraform init
          terraform plan
          terraform apply -auto-approve 
        env:
          TF_VAR_apikey: ${{ secrets.APIKEY }}
```
2) To deploy the env to cloud functions, u will need to edit the terraform file that is in the folder that u created.
  - Head on to variables.tf and add the variable name that u created into it, example: 
  ```
   variable "apikey" {
      type = string
    }
  ```
  - Then head on to the cloudfunction.tf file , and add the variable into the environmental variables block
  ```
   module "cloudfunction_deploy" {
      source = "../../modules/cloudfunction"
      name = "test"
      runtime = "go116"
      entry_point = "Initialfunc"
      environment_variables = {
        apikey = var.apikey
      }
   }
  ```
3) If u do NOT need any environmental variables to be parsed in, then u can delete the environmental_variables block and also the variables.tf file
  ```
  module "cloudfunction_deploy" {
      source = "../../modules/cloudfunction"
      name = "test"
      runtime = "go116"
      entry_point = "Initialfunc"
   }
  ```

  ## How to invoke the function
  There will be a link generated at the end of the steps called "show http trigger name" , that is the URL that u can call to invoke your function
