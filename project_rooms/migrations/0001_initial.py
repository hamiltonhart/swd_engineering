# Generated by Django 2.1.7 on 2019-12-20 01:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('rooms', '__first__'),
        ('rental_projects', '__first__'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProjectRoom',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('primary_room', models.BooleanField(blank=True, default=False, verbose_name='Set Primary')),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='rental_rooms', to='rental_projects.RentalProject')),
                ('room', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='rental_projects', to='rooms.Stage', verbose_name='Room')),
            ],
        ),
        migrations.AlterUniqueTogether(
            name='projectroom',
            unique_together={('room', 'project')},
        ),
    ]
