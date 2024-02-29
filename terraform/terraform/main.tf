variable "AWS_ACCESS_KEY_ID" {
  type = string
  default = ""
}

variable "AWS_SECRET_ACCESS_KEY" {
  type = string
  default = ""
}

provider "aws" {
    region = "ap-northeast-2"
    access_key = var.AWS_ACCESS_KEY_ID
    secret_key = var.AWS_SECRET_ACCESS_KEY
}

resource "aws_vpc" "vpc_tutorial" {
    cidr_block = "10.0.0.0/16"
}
resource "aws_internet_gateway" "gateway_tutorial" {
    vpc_id = aws_vpc.vpc_tutorial.id
}
resource "aws_route_table" "route_table_tutorial" {
    vpc_id = aws_vpc.vpc_tutorial.id
    route {
        cidr_block = "0.0.0.0/0"
        gateway_id = aws_internet_gateway.gateway_tutorial.id
    }
    route{
        ipv6_cidr_block = "::/0"
        gateway_id = aws_internet_gateway.gateway_tutorial.id
    }
    tags = {
        Name = "route_table_tutorial"
    }
}
resource "aws_subnet" "subnet_tutorial" {
    vpc_id = aws_vpc.vpc_tutorial.id
    cidr_block = "10.0.1.0/24"
    availability_zone = "ap-northeast-2a"
    tags = {
        Name = "subnet_tutorial"
    }
}
resource "aws_route_table_association" "route_association_tutorial" {
    subnet_id = aws_subnet.subnet_tutorial.id
    route_table_id = aws_route_table.route_table_tutorial.id
}

resource "aws_security_group" "security_group_tutorial" {
  name        = "allow_web"
  description = "Allow Web inbound traffic"
  vpc_id      = aws_vpc.vpc_tutorial.id

  ingress {
    description      = "HTTPS"
    from_port        = 443
    to_port          = 443
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
  }
    ingress {
    description      = "HTTP"
    from_port        = 80
    to_port          = 80
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
  }
    ingress {
    description      = "SSH"
    from_port        = 22
    to_port          = 22
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
  }

  tags = {
    Name = "allow_web"
  }
}

resource "aws_network_interface" "web-server-nic" {
  subnet_id       = aws_subnet.subnet_tutorial.id
  private_ips     = ["10.0.1.50"]
  security_groups = [aws_security_group.security_group_tutorial.id]
}

resource "aws_eip" "elastic_ip" {
  vpc                       = true
  network_interface         = aws_network_interface.web-server-nic.id
  associate_with_private_ip = "10.0.1.50"
  depends_on = [aws_internet_gateway.gateway_tutorial]
}

resource "aws_instance" "web-server-instance" {
    ami = "ami-04cebc8d6c4f297a3"
    instance_type = "t2.micro"
    tags = {
        Name = "terraform-ec2-tutorial"
    }
    availability_zone = "ap-northeast-2a"
    key_name = "terraform-tutorial"
    network_interface {
        network_interface_id = aws_network_interface.web-server-nic.id
        device_index = 0
    }
    user_data = <<-EOF
    #!/bin/bash
    sudo apt update -y
    sudo apt install apache2 -y
    sudo system start apache2
    sudo bash -c 'echo "Hello World" > /var/www/html/index.html'
    EOF
}