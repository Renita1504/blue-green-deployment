provider "aws" {
  region = "ap-south-1"
}

# ✅ Default VPC
data "aws_vpc" "custom" {
  id = "vpc-0a05dd3bba77c1c36"
}

# ✅ Security Group
resource "aws_security_group" "allow_app" {
  name = "allow_app"
  vpc_id = data.aws_vpc.custom.id 
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# ✅ BLUE INSTANCE
resource "aws_instance" "blue" {
  ami           = "ami-0f5ee92e2d63afc18"
  instance_type = "t3.micro"

  associate_public_ip_address = true
  vpc_security_group_ids      = [aws_security_group.allow_app.id]
  subnet_id = "subnet-005b1819b04c3997b"
  user_data = <<-EOF
              #!/bin/bash
              apt update -y
              apt install docker.io -y
              systemctl start docker
              systemctl enable docker
              docker pull renita7008/app-blue
              docker run -d -p 3000:3000 renita7008/app-blue
              EOF

  tags = {
    Name = "blue-server"
  }
  key_name = "blue-green-key"
}

# ✅ GREEN INSTANCE
resource "aws_instance" "green" {
  ami           = "ami-0f5ee92e2d63afc18"
  instance_type = "t3.micro"

  associate_public_ip_address = true
  vpc_security_group_ids      = [aws_security_group.allow_app.id]
   subnet_id = "subnet-0acd0968edf8a83f1"
  user_data = <<-EOF
              #!/bin/bash
              apt update -y
              apt install docker.io -y
              systemctl start docker
              systemctl enable docker
              docker pull renita7008/app-green
              docker run -d -p 3000:3000 renita7008/app-green
              EOF

  tags = {
    Name = "green-server"
  }
  key_name = "blue-green-key"
}

# ✅ TARGET GROUP
resource "aws_lb_target_group" "app_tg" {
  name     = "app-target-group"
  port     = 3000
  protocol = "HTTP"
  vpc_id = data.aws_vpc.custom.id

  health_check {
    path = "/"
    port = "3000"
  }
}

# ✅ ATTACHMENTS
resource "aws_lb_target_group_attachment" "blue_attach" {
  target_group_arn = aws_lb_target_group.app_tg.arn
  target_id        = aws_instance.blue.id
  port             = 3000
}

resource "aws_lb_target_group_attachment" "green_attach" {
  target_group_arn = aws_lb_target_group.app_tg.arn
  target_id        = aws_instance.green.id
  port             = 3000
}

# ✅ LOAD BALANCER (FIXED HERE 🔥)
resource "aws_lb" "app_lb" {
  name               = "app-load-balancer"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.allow_app.id]

  subnets = [
    "subnet-005b1819b04c3997b",  # AZ 1
    "subnet-0acd0968edf8a83f1"   # AZ 2
  ]
}

# ✅ LISTENER
resource "aws_lb_listener" "app_listener" {
  load_balancer_arn = aws_lb.app_lb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.app_tg.arn
  }
}