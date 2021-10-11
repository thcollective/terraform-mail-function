provider "google" {
  project     = "pathforge-v1"
  region      = "asia-southeast1"
  credentials = "keyfile.json"
}

# terraform {
#   backend "gcs" {
#     bucket  = "test-bucket-tms"
#     prefix  = "terraform/state/sendMail"
#   }
# }