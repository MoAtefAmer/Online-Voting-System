# Generated by Django 4.1.7 on 2023-03-11 10:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Poll',
            new_name='Polls',
        ),
    ]