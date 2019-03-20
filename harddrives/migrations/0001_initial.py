# Generated by Django 2.1 on 2019-03-18 23:23

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='RentalDrive',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('drive_number', models.IntegerField(unique=True, verbose_name='Drive Number')),
                ('drive_capacity_gb', models.CharField(choices=[('250GB', '250GB'), ('500GB', '500GB'), ('1TB', '1TB'), ('2TB', '2TB'), ('3TB', '3TB')], max_length=10, verbose_name='Drive Capacity')),
            ],
        ),
    ]
