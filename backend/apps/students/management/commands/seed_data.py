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
                "first_name": "Ahmed",
                "last_name": "Hassan",
                "email": "ahmed.hassan@school.com",
                "phone": "+20100123456",
                "date_of_birth": "2008-05-15",
                "grade": "10A",
                "address": "Cairo, Egypt",
            },
            {
                "first_name": "Fatima",
                "last_name": "Mohamed",
                "email": "fatima.mohamed@school.com",
                "phone": "+20100234567",
                "date_of_birth": "2008-08-22",
                "grade": "10B",
                "address": "Giza, Egypt",
            },
            {
                "first_name": "Ibrahim",
                "last_name": "Ali",
                "email": "ibrahim.ali@school.com",
                "phone": "+20100345678",
                "date_of_birth": "2007-12-10",
                "grade": "11A",
                "address": "Alexandria, Egypt",
            },
            {
                "first_name": "Aisha",
                "last_name": "Ahmed",
                "email": "aisha.ahmed@school.com",
                "phone": "+20100456789",
                "date_of_birth": "2008-03-18",
                "grade": "10C",
                "address": "Cairo, Egypt",
            },
            {
                "first_name": "Omar",
                "last_name": "Ibrahim",
                "email": "omar.ibrahim@school.com",
                "phone": "+20100567890",
                "date_of_birth": "2007-11-05",
                "grade": "11B",
                "address": "Helwan, Egypt",
            },
            {
                "first_name": "Sara",
                "last_name": "Hassan",
                "email": "sara.hassan@school.com",
                "phone": "+20100678901",
                "date_of_birth": "2008-06-30",
                "grade": "10A",
                "address": "Maadi, Cairo",
            },
            {
                "first_name": "Karim",
                "last_name": "Mohamed",
                "email": "karim.mohamed@school.com",
                "phone": "+20100789012",
                "date_of_birth": "2007-09-14",
                "grade": "11C",
                "address": "New Cairo, Egypt",
            },
            {
                "first_name": "Noor",
                "last_name": "Abdullah",
                "email": "noor.abdullah@school.com",
                "phone": "+20100890123",
                "date_of_birth": "2008-02-28",
                "grade": "10B",
                "address": "Zamalek, Cairo",
            },
            {
                "first_name": "Zainab",
                "last_name": "Ali",
                "email": "zainab.ali@school.com",
                "phone": "+20100901234",
                "date_of_birth": "2008-07-11",
                "grade": "10D",
                "address": "Dokki, Cairo",
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
