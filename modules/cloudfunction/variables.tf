variable "name" {
  type = string         //name needs to be unique
}

variable "runtime" {
   type = string
}

variable "entry_point" {
   type = string
}

variable "environment_variables" {
   default = null
}