# Generated by Django 4.1.7 on 2023-03-11 11:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0004_rename_poll_id_choices_poll_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='polls',
            options={'ordering': ['-end_date']},
        ),
    ]
