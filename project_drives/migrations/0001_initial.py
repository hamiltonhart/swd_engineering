# Generated by Django 2.1.7 on 2019-12-20 01:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('harddrives', '0001_initial'),
        ('rental_projects', '__first__'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProjectDrive',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('notes', models.TextField(blank=True, null=True)),
                ('drive', models.ForeignKey(limit_choices_to={'rental_projects': None}, on_delete=django.db.models.deletion.CASCADE, related_name='rental_projects', to='harddrives.RentalDrive')),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='rental_drives', to='rental_projects.RentalProject')),
            ],
        ),
        migrations.AlterUniqueTogether(
            name='projectdrive',
            unique_together={('project', 'drive')},
        ),
    ]
