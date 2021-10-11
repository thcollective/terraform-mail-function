module "cloudfunction_deploy" {
  source = "../../modules/cloudfunction"
  name = "sendMail"
  runtime = "nodejs14"
  entry_point = "trigger"
  environment_variables = {
    EMAIL_MAIN = var.EMAIL_MAIN
    MAILGUN_API_KEY = var.MAILGUN_API_KEY
    MAILGUN_MAIL_DOMAIN = var.MAILGUN_MAIL_DOMAIN
  }
}
