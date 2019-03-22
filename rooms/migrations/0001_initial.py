# Generated by Django 2.1 on 2019-03-18 23:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True, verbose_name='Name')),
                ('notes', models.TextField(blank=True, null=True, verbose_name='Notes')),
            ],
        ),
        migrations.CreateModel(
            name='BasicRoom',
            fields=[
                ('room_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='rooms.Room')),
            ],
            bases=('rooms.room',),
        ),
        migrations.CreateModel(
            name='Stage',
            fields=[
                ('room_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='rooms.Room')),
                ('media_shuttle_connection_ip', models.CharField(default='10.254.129.250', max_length=50, verbose_name='Connection IP')),
                ('media_shuttle_subnet', models.CharField(default='255.255.255.240', max_length=50, verbose_name='Subnet Mask')),
                ('media_shuttle_host', models.CharField(default='10.254.129.xxx', max_length=50, verbose_name='Host IP')),
                ('media_shuttle_ip_range', models.CharField(max_length=50, verbose_name='IP Range')),
            ],
            bases=('rooms.room',),
        ),
    ]