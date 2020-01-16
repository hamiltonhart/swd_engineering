# Generated by Django 3.0.1 on 2020-01-04 22:36

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rental_projects', '0002_rentalproject_files_link'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rentalproject',
            name='protools_vers',
            field=models.FloatField(verbose_name='ProTools Version'),
        ),
        migrations.AlterField(
            model_name='rentalproject',
            name='start_date',
            field=models.DateField(blank=True, default=datetime.date.today),
        ),
    ]
