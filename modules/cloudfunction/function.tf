resource "google_storage_bucket" "bucket" {
  name = "bucket-terraform-mail-service"
}

resource "google_storage_bucket_object" "archive" {
  name   = "${var.name}.zip"
  bucket = google_storage_bucket.bucket.name
  source = "../../${var.name}.zip"
}

resource "google_cloudfunctions_function" "function" {
  name        = var.name
  description = "Send mail on http trigger"
  runtime     = var.runtime

  available_memory_mb   = 128
  source_archive_bucket = google_storage_bucket.bucket.name
  source_archive_object = google_storage_bucket_object.archive.name
  trigger_http          = true
  entry_point           = var.entry_point
  region                = "asia-southeast1"
  environment_variables = var.environment_variables
}

# IAM entry for all users to invoke the function
resource "google_cloudfunctions_function_iam_member" "invoker" {
  project        = google_cloudfunctions_function.function.project
  region         = google_cloudfunctions_function.function.region
  cloud_function = google_cloudfunctions_function.function.name

  role   = "roles/cloudfunctions.invoker"
  member = "allUsers"
}