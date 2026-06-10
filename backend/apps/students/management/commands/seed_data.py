from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from apps.students.models import Student
from datetime import datetime


class Command(BaseCommand):
    help = "Seed database with 1 admin user and 9 students"

    def handle(self, *args, **options):
        # Clear existing data
        User.objects.filter(username="admin").delete()
        Student.objects.all().delete()

        # Create admin user
        admin_user = User.objects.create_superuser(
            username="admin",
            email="admin@school.com",
            password="admin123"
        )
        self.stdout.write(
            self.style.SUCCESS(
                f"✓ Admin user created: admin / admin123"
            )
        )

        # Create 9 students
        students_data = [
    {
        "first_name": "Arjun",
        "last_name": "Nair",
        "email": "arjun.nair@school.com",
        "phone": "+919876543210",
        "date_of_birth": "2008-05-15",
        "grade": "10A",
        "address": "Thrissur, Kerala",
    },
    {
        "first_name": "Ananya",
        "last_name": "Menon",
        "email": "ananya.menon@school.com",
        "phone": "+919876543211",
        "date_of_birth": "2008-08-22",
        "grade": "10B",
        "address": "Kochi, Kerala",
    },
    {
        "first_name": "Rahul",
        "last_name": "Sharma",
        "email": "rahul.sharma@school.com",
        "phone": "+919876543212",
        "date_of_birth": "2007-12-10",
        "grade": "11A",
        "address": "Bengaluru, Karnataka",
    },
    {
        "first_name": "Priya",
        "last_name": "Krishnan",
        "email": "priya.krishnan@school.com",
        "phone": "+919876543213",
        "date_of_birth": "2008-03-18",
        "grade": "10C",
        "address": "Kozhikode, Kerala",
    },
    {
        "first_name": "Aditya",
        "last_name": "Verma",
        "email": "aditya.verma@school.com",
        "phone": "+919876543214",
        "date_of_birth": "2007-11-05",
        "grade": "11B",
        "address": "Mumbai, Maharashtra",
    },
    {
        "first_name": "Sneha",
        "last_name": "Reddy",
        "email": "sneha.reddy@school.com",
        "phone": "+919876543215",
        "date_of_birth": "2008-06-30",
        "grade": "10A",
        "address": "Hyderabad, Telangana",
    },
    {
        "first_name": "Vikram",
        "last_name": "Iyer",
        "email": "vikram.iyer@school.com",
        "phone": "+919876543216",
        "date_of_birth": "2007-09-14",
        "grade": "11C",
        "address": "Chennai, Tamil Nadu",
    },
    {
        "first_name": "Diya",
        "last_name": "Patel",
        "email": "diya.patel@school.com",
        "phone": "+919876543217",
        "date_of_birth": "2008-02-28",
        "grade": "10B",
        "address": "Ahmedabad, Gujarat",
    },
    {
        "first_name": "Meera",
        "last_name": "Pillai",
        "email": "meera.pillai@school.com",
        "phone": "+919876543218",
        "date_of_birth": "2008-07-11",
        "grade": "10D",
        "address": "Thiruvananthapuram, Kerala",
    },
]

        for student_data in students_data:
            Student.objects.create(
                first_name=student_data["first_name"],
                last_name=student_data["last_name"],
                email=student_data["email"],
                phone=student_data["phone"],
                date_of_birth=student_data["date_of_birth"],
                grade=student_data["grade"],
                address=student_data["address"],
                is_active=True,
            )

        self.stdout.write(
            self.style.SUCCESS(f"✓ Created 9 students successfully")
        )
        self.stdout.write(
            self.style.SUCCESS("\n" + "="*50)
        )
        self.stdout.write(
            self.style.SUCCESS("SEED DATA COMPLETE")
        )
        self.stdout.write(
            self.style.SUCCESS("="*50)
        )
        self.stdout.write(
            self.style.WARNING("Admin Credentials:")
        )
        self.stdout.write(
            self.style.WARNING("Username: admin")
        )
        self.stdout.write(
            self.style.WARNING("Password: admin123")
        )
        self.stdout.write(
            self.style.SUCCESS("="*50 + "\n")
        )
